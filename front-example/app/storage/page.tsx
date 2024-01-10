"use client";
import supabase from '@/utils/supabase';
import { uploadStorage } from '@/utils/upload';
import { useEffect, useState } from 'react';

export default function Example(){
  const [ path,setPathName ] = useState<string | undefined>();
  const handleUploadStorage = async (folder: FolderList | null) => {
    if (!folder || !folder.length) return;
    const { path } = await uploadStorage({
      folder,
      bucketName: "public",
    });
    const { data } = supabase.storage.from("public").getPublicUrl(path)
    if (path) setPathName(data.publicUrl);
    console.log(path)
  };
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      console.log(user)
      setUser(user);
    }
    
  )}, []);
  return (
    <div>
      <p>{user?.id}</p>
          <label htmlFor="file-upload">
      <span>アップロードする</span>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
				accept="image/png, image/jpeg"
        onChange={(e) => {
          const fileList = e.target?.files;
          console.log(fileList);
          handleUploadStorage(fileList);
        }}
      />
      <img src={path} alt="" width="800" height="500"/>;
    </label>
    </div>
  );
};
