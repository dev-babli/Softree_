#!/usr/bin/env bash
set -euo pipefail

# Build linux/amd64 and push to ECR. Requires AWS CLI + Docker.
# Usage:
#   AWS_REGION=ap-south-1 ECR_REPOSITORY=softree-site IMAGE_TAG=staging ./scripts/ecs-push.sh

REGION="${AWS_REGION:-ap-south-1}"
REPO_NAME="${ECR_REPOSITORY:-softree-site}"
TAG="${IMAGE_TAG:-staging}"

ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
REPO_URI="${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/${REPO_NAME}"

if ! aws ecr describe-repositories --repository-names "${REPO_NAME}" --region "${REGION}" >/dev/null 2>&1; then
  aws ecr create-repository \
    --repository-name "${REPO_NAME}" \
    --region "${REGION}" \
    --image-scanning-configuration scanOnPush=true
fi

aws ecr get-login-password --region "${REGION}" | \
  docker login --username AWS --password-stdin "${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com"

BUILD_ARGS=(
  --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://www.softreetechnology.com}"
  --build-arg "NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID:-1zmh4sfw}"
  --build-arg "NEXT_PUBLIC_SANITY_DATASET=${NEXT_PUBLIC_SANITY_DATASET:-production}"
  --build-arg "NEXT_PUBLIC_SANITY_API_VERSION=${NEXT_PUBLIC_SANITY_API_VERSION:-2026-05-21}"
  --build-arg "NEXT_PUBLIC_SANITY_STUDIO_URL=${NEXT_PUBLIC_SANITY_STUDIO_URL:-https://www.softreetechnology.com/studio}"
  --build-arg "NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY:-}"
  --build-arg "NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST:-}"
  --build-arg "NEXT_PUBLIC_CALENDLY_URL=${NEXT_PUBLIC_CALENDLY_URL:-}"
  --build-arg "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=${NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:-}"
)

docker build --platform linux/amd64 "${BUILD_ARGS[@]}" -t "${REPO_NAME}:${TAG}" .
docker tag "${REPO_NAME}:${TAG}" "${REPO_URI}:${TAG}"
docker push "${REPO_URI}:${TAG}"

echo "Pushed ${REPO_URI}:${TAG}"
