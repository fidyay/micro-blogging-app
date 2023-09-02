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
    return (
      <Avatar
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          ...sx,
        }}
      >
        {children}
      </Avatar>
    );
  }
}

export default UserAvatar;
