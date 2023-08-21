import { useState } from "react";
import useGetUrl from "../hooks/useGetUrls";

function Test() {
  const [urls, setUrls] = useState<string[]>([]);
  const { ref, onChange, isLoading, isError } = useGetUrl(setUrls);

  console.log(urls);

  if (isLoading) return <div>이미지 url 변환중....</div>;

  return (
    <div>
      <input type="file" multiple ref={ref} onChange={onChange} />
    </div>
  );
}

export default Test;
