import AppLink from "./AppLink";
import AppBlockWrapper from "./AppBlockWrapper";

function Navigation() {
  return (
    <AppBlockWrapper>
      <AppLink id="general" />
      {[1, 2, 3].map((item, index) => (
        <AppLink id={item.toString()} key={index} />
      ))}
    </AppBlockWrapper>
  );
}

export default Navigation;
