import { useState } from "react";
import { ConfigProvider, Empty, Radio } from "antd";
import "moment/locale/zh-cn";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

function InternationalizedComp() {
  const [locale, setLocale] = useState(enUS);

  return (
    <ConfigProvider locale={locale}>
      <Radio.Group
        value={locale}
        onChange={() => {
          setLocale(locale === enUS ? zhCN : enUS);
        }}
      >
        <Radio.Button key="en" value={enUS}>
          English
        </Radio.Button>
        <Radio.Button key="cn" value={zhCN}>
          中文
        </Radio.Button>
      </Radio.Group>
      <Empty />
      英文
      <input
        type="radio"
        name="locale"
        value={"en"}
        onChange={(e) => {
          setLocale(e.target.value === "en" ? enUS : zhCN);
        }}
      />
      中文
      <input
        type="radio"
        name="locale"
        value="zh-cn"
        onChange={(e) => {
          setLocale(e.target.value === "zh-cn" ? zhCN : enUS);
        }}
      />
    </ConfigProvider>
  );
}

export default InternationalizedComp;
