import styles from "./index.less";
import { Button } from "antd";
import { Link, history } from "umi";
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>首页</h1>
      <Button
        onClick={() => {
          history.push("/user");
        }}
      >
        跳转到user页面
      </Button>
    </div>
  );
}
