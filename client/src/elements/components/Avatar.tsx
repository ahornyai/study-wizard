import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { MouseEventHandler, MutableRefObject } from "react"

interface AvatarProps {
  className?: string
  forwardedClass?: string
  image?: string
  size?: string
  forwardedRef?: MutableRefObject<any>
  onClick?: MouseEventHandler<any>
}

const Avatar = ({
  className = "",
  forwardedClass = "",
  image = "",
  size = "base",
  forwardedRef,
  onClick,
}: AvatarProps) => {
  let finalClass = `${className} relative rounded-full`
  if (!image) finalClass += " bg-gray-300 flex items-center justify-center"

  if (size === "xs") {
    finalClass += " w-4 h-4"
  } else if (size === "sm") {
    finalClass += " w-8 h-8"
  } else if (size === "base") {
    finalClass += " w-12 h-12"
  } else if (size === "lg") {
    finalClass += " w-16 h-16"
  } else if (size === "xl") {
    finalClass += " w-20 h-20"
  } else if (size === "2xl") {
    finalClass += " w-24 h-24"
  }

  return (
    <div className={finalClass} style={{ aspectRatio: '1/1' }} >
      {image ? (
        <img
          src={image}
          style={{ aspectRatio: '1/1' }}
          alt="avatar"
          className={"absolute left-0 top-0 w-full h-full rounded-full object-cover bg-[#19212C] " + forwardedClass}
          ref={forwardedRef}
          onClick={onClick}
        />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </div>
  )
}

export default Avatar
