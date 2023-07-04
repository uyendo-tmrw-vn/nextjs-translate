import { useRouter } from "next/router";
import { useEffect } from "react";

export default (url: string, scroll?: boolean) =>
  function Redirect() {
    const router = useRouter();
    // const [_, currentLang, query] = useTranslation();

    useEffect(() => {
      const lang = localStorage.getItem("lang")!;
      router.replace(`${url}?lang=${lang}`, undefined, {
        scroll: scroll ?? false,
      });
    }, []);

    return null;
  };
