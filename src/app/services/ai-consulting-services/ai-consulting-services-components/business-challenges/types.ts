export interface ChallengeItem {
  title: string;
  description: string;
  iconName: string;
}

export interface BusinessChallengePair {
  id: string;
  challenge: ChallengeItem;
  solution: ChallengeItem;
}
