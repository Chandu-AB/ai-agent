import simpleGitModule from "simple-git";
import axios from "axios";
import { config } from "dotenv";

config();
const simpleGit = (simpleGitModule as any).default || simpleGitModule;

export const createPRTool = {
  name: "createPR",

  execute: async () => {
    try {
      const git = simpleGit(process.cwd());

      // 1. Check repo
      if (!(await git.checkIsRepo())) {
        throw new Error("❌ Not a Git repo");
      }

      // 2. Check changes
      const status = await git.status();
      if (status.isClean()) {
        return {
          content: [{ type: "text", text: "⚠️ No changes to commit" }]
        };
      }

      // 3. Get branch
      const branch = (await git.branchLocal()).current;

      if (branch === "main") {
        throw new Error("❌ Switch to feature branch first");
      }

      // 4. Commit & Push
      await git.add(".");
      await git.commit("feat: auto commit from AI");
      await git.push("origin", branch);

      const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

      // 🔥 5. Check if PR already exists
      const existingPR = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          },
          params: {
            head: `${GITHUB_OWNER}:${branch}`,
            state: "open"
          }
        }
      );

      if (existingPR.data.length > 0) {
        return {
          content: [
            {
              type: "text",
              text: `🔁 PR already exists:\n${existingPR.data[0].html_url}`
            }
          ]
        };
      }

      // 6. Create PR
      const res = await axios.post(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
        {
          title: "Auto PR from AI",
          head: branch,
          base: "main"
        },
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          }
        }
      );

      return {
        content: [
          {
            type: "text",
            text: `✅ PR Created:\n${res.data.html_url}`
          }
        ]
      };

    } catch (err: any) {
      return {
        content: [{ type: "text", text: err.message }]
      };
    }
  }
};