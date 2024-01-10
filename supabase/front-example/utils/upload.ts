import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import supabase from "./supabase";

type UploadStorage = {
  folder: FolderList;
  bucketName: string;
};

type UploadPathname = {
  path: string;
};

export const uploadStorage = async ({
  folder,
  bucketName,
}: UploadStorage): Promise<UploadPathname> => {
    // const user = await supabase.auth.getUser();
    // console.log(JSON.stringify(user, null, 2));
    const file = folder[0]; // 1ファイルアップロード
    const pathName = `next-test/${uuidv4()}.png`; // パス名の設定
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(pathName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
    return {
      path: data?.path ?? null,
    };
};
