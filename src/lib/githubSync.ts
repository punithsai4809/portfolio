export async function syncToGitHub(
  filePath: string,
  content: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  // Check for GITHUB_TOKEN or PORTFOLIO_GITHUB_TOKEN or GH_TOKEN
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.PORTFOLIO_GITHUB_TOKEN ||
    process.env.GH_TOKEN;

  if (!token) {
    return {
      success: false,
      error: "GITHUB_TOKEN environment variable is not set on Vercel",
    };
  }

  const repo = process.env.GITHUB_REPOSITORY || "punithsai4809/portfolio";
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  let sha: string | undefined;
  try {
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Nextjs-Admin-Sync",
      },
      cache: "no-store",
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    } else if (getRes.status !== 404) {
      const errText = await getRes.text();
      return {
        success: false,
        error: `GitHub GET SHA failed (${getRes.status}): ${errText}`,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: `Network error fetching SHA: ${err?.message || String(err)}`,
    };
  }

  try {
    const base64Content = Buffer.from(content, "utf-8").toString("base64");
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Nextjs-Admin-Sync",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        sha,
      }),
    });

    if (putRes.ok) {
      return { success: true };
    } else {
      const errText = await putRes.text();
      return {
        success: false,
        error: `GitHub PUT failed (${putRes.status}): ${errText}`,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: `Network error pushing commit: ${err?.message || String(err)}`,
    };
  }
}
