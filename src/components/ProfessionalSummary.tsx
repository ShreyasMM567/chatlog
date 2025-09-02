import React from "react";
import GlassContainer from "./GlassContainer";

export default function ProfessionalSummary() {
  return (
    <section className="py-16 px-8 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Professional Summary
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        <GlassContainer>
          <div className="py-8 px-4 md:px-8">
            <p className="text-xl text-gray-300 leading-relaxed mb-8 text-center">
              Accomplished software engineer with a proven track record in designing, developing, and deploying scalable web applications. Adept at leveraging modern technologies to deliver robust solutions, with a strong focus on code quality, performance, and user experience.
            </p>
            <ul className="space-y-4 max-w-xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg></span>
                <span className="text-gray-200 text-lg">Expertise in React, Next.js, TypeScript, and .NET for full-stack development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" /></svg></span>
                <span className="text-gray-200 text-lg">Strong background in DevOps, CI/CD, and cloud platforms (Azure, AWS)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1"><svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,2 18,18 2,18" /></svg></span>
                <span className="text-gray-200 text-lg">Proven ability to lead teams, mentor developers, and deliver high-impact results</span>
              </li>
            </ul>
          </div>
        </GlassContainer>
      </div>
    </section>
  );
} 