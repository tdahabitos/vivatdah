import axios from "axios";
import type { PandaFolder, PandaVideo } from "~/types";

export async function getVideos(
  folderId: string | null,
  page = 1,
  limit = 10
): Promise<PandaVideo[]> {
  const videos = await axios
    .get("https://api-v2.pandavideo.com.br/videos", {
      params: {
        ...(folderId ? { folder_id: folderId } : {}),
        page,
        limit,
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_PANDA_API_KEY,
      },
    })
    .then((res) => res.data.videos);

  return videos;
}

export async function searchVideos(value: string): Promise<PandaVideo[]> {
  const videos = await axios
    .get("https://api-v2.pandavideo.com.br/videos", {
      params: {
        title: value,
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_PANDA_API_KEY,
      },
    })
    .then((res) => res.data.videos);

  return videos;
}

export async function getFolderVideos(folderId: string): Promise<PandaVideo[]> {
  const folders = await axios
    .get("https://api-v2.pandavideo.com.br/folders", {
      params: {
        parent_folder_id: folderId,
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_PANDA_API_KEY,
      },
    })
    .then((res) => res.data.folders);

  const videosPromises = folders.map(async (folder: PandaFolder) => {
    const videosCount = Number.parseInt(folder.videos_count);

    if (videosCount > 0) {
      const videos = getVideos(folder.id, 1, videosCount);

      return videos;
    }

    return getFolderVideos(folder.id);
  });

  const videos = await Promise.all(videosPromises);

  return videos.flat();
}

export async function getVideo(
  id: string
): Promise<PandaVideo & { related: PandaVideo[] }> {
  const video = await axios
    .get(`https://api-v2.pandavideo.com.br/videos/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_PANDA_API_KEY,
      },
    })
    .then((res) => res.data);

  const related = (await getVideos(video.folder_id, 1, 8)).filter(
    (video) => video.id !== id
  );

  return { ...video, related };
}
