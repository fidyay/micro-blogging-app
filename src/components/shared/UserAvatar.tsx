import { Avatar } from "@mui/material";
import { ComponentSx } from "@/pages/_app";

interface AvatarProps {
  sx?: ComponentSx;
  size?: number;
}

interface AvatarImageProps extends AvatarProps {
  src: string;
  alt: string;
}
interface AvatarTextProps extends AvatarProps {
  children: string;
}

type UserAvatarProps = AvatarImageProps | AvatarTextProps;

// function that generates color depending on user name
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function to retrieve text from name to avatar
function stringAvatar(name: string, size: number, sx: ComponentSx) {
  return {
    sx: {
      width: `${size}px`,
      height: `${size}px`,
      bgcolor: stringToColor(name),
      ...sx,
    },
    children:
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name.split(" ")[0][0]}`,
  };
}

// user avatar component with defined styling
function UserAvatar(props: UserAvatarProps) {
  if (Object.hasOwn(props, "src")) {
    const { src, alt, size = 30, sx = {} } = props as AvatarImageProps;
    return (
      <Avatar
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          "& img": {
            transform: "scale(1.3)",
          },
          ...sx,
        }}
        src={src}
        alt={alt}
      />
    );
  } else {
    const { children, size = 30, sx = {} } = props as AvatarTextProps;
    return <Avatar {...stringAvatar(children, size, sx)} />;
  }
}

export default UserAvatar;
