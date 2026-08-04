export async function syncToGitHub(
  filePath: string,
  content: string,
  message: string
): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return false;
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
    }
  } catch (err) {
    console.error("Error fetching file SHA from GitHub:", err);
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

    return putRes.ok;
  } catch (err) {
    console.error("Error pushing content update to GitHub:", err);
    return false;
  }
}
