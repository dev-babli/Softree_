"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Server,
  CloudUpload,
} from "lucide-react";

export default function AdfToFabricHeroVisual() {
  const [activeTab, setActiveTab] = useState<"adf" | "fabric" | "diff">("fabric");
  const [copied, setCopied] = useState(false);

  const adfCode = `{
  "$schema": "http://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "name": "ADF_Legacy_ETL_Pipeline",
  "properties": {
    "activities": [
      {
        "name": "Copy_ADLS_To_SQLDW",
        "type": "Copy",
        "inputs": [{ "referenceName": "ADLS_Gen2_Parquet" }],
        "outputs": [{ "referenceName": "Azure_Synapse_DW" }]
      },
      {
        "name": "Execute_SSIS_Package",
        "type": "ExecuteSSISPackage",
        "dependsOn": [{ "activity": "Copy_ADLS_To_SQLDW" }]
      }
    ]
  }
}`;

  const fabricCode = `# Microsoft Fabric - Spark Lakehouse Data Pipeline
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp

# OneLake Direct Access - Delta Lakehouse Target
onelake_path = "abfss://workspace@onelake.dfs.fabric.microsoft.com/lakehouse.Lakehouse/Tables/EnterpriseSales"

df_raw = spark.read.format("delta").load(onelake_path)

# Unified High-Performance Transformation
df_transformed = df_raw.filter(col("status") == "COMPLETED") \\
                       .withColumn("ingested_at", current_timestamp())

# Write back to OneLake Delta Parquet with DirectLake enabled
df_transformed.write.format("delta").mode("append").save(onelake_path)
print("✅ Successfully ingested into Fabric OneLake Lakehouse!")`;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-[#090D16] border border-slate-800/80 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            ADF to Fabric Converter v2.4
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#151c2d] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("adf")}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              activeTab === "adf"
                ? "bg-slate-700 text-slate-200 font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Legacy ADF
          </button>
          <button
            onClick={() => setActiveTab("fabric")}
            className={`px-2.5 py-1 rounded text-xs transition-all ${
              activeTab === "fabric"
                ? "bg-orange-600 text-white font-semibold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Fabric Lakehouse
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 relative min-h-[300px] bg-[#070b13] overflow-x-auto text-slate-200">
        <AnimatePresence mode="wait">
          {activeTab === "adf" && (
            <motion.pre
              key="adf"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-slate-400 leading-relaxed font-mono"
            >
              <code>{adfCode}</code>
            </motion.pre>
          )}

          {activeTab === "fabric" && (
            <motion.pre
              key="fabric"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-emerald-400/90 leading-relaxed font-mono"
            >
              <code>{fabricCode}</code>
            </motion.pre>
          )}
        </AnimatePresence>

        {/* Live Transformation Floating Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#121929]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-orange-500/30 text-xs text-slate-200 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-sans font-medium text-orange-300">
            OneLake Delta Parquet DirectLake Ready
          </span>
        </div>
      </div>

      {/* Visual Pipeline Metric Footer */}
      <div className="grid grid-cols-3 divide-x divide-slate-800 bg-[#0c111c] border-t border-slate-800/80 p-3 text-center">
        <div>
          <div className="text-xs text-slate-400 font-sans">ADF Pipelines</div>
          <div className="text-sm font-bold text-white mt-0.5">100% Automated</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-sans">Query Speed</div>
          <div className="text-sm font-bold text-orange-400 mt-0.5">10x Faster DirectLake</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-sans">Storage Cost</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">30-50% Savings</div>
        </div>
      </div>
    </div>
  );
}
