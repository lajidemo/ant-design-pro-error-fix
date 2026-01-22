import { Button, type ButtonProps, ConfigProvider } from 'antd';
import { createStaticStyles, createStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => {
  console.log('cssVar.colorPrimary', cssVar.colorPrimary);
  return {
    container: css`
    background-color: ${cssVar.colorPrimary};
  `,
  };
});

const MyButton = (props: ButtonProps) => {
  return (
    <div className={styles.container}>
      <Button {...props}>{props.children}</Button>
    </div>
  );
};

export default MyButton;
