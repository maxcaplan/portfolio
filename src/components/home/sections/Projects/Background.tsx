import { useEffect, useRef, useState } from "react"

import BackgroundTextPath from "../../../../assets/sections/projects/projects_bg_text.svg"

/** Background component for projects section */
export default function Background() {
  let [length, set_length] = useState(0) // Length of the background text wrapper
  let [rotation, set_rotation] = useState(0) // angle of the background text wrapper
  let [background_width, set_background_width] = useState(0) // Width of background text svg

  // Background text wrapper ref
  let wrapper_ref = useRef<HTMLDivElement>(null)

  /** Calculates the transform for the background text */
  let calc_transform = (wrapper_ref: React.RefObject<HTMLDivElement>) => {
    if (wrapper_ref.current === null || wrapper_ref.current.parentElement === null) {
      return { length: 0, angle: 0 }
    }

    const a = wrapper_ref.current.parentElement.clientHeight
    const b = wrapper_ref.current.parentElement.clientWidth
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

    const theta = Math.asin(a / c)

    return { length: c, angle: theta * (180 / Math.PI) }
  }

  /** Calculates the width of the background svg given wrappers size */
  let calc_background_svg_width = (wrapper_ref: React.RefObject<HTMLDivElement>) => {
    if (wrapper_ref.current === null) {
      return 0
    }

    const svg_aspect_ratio = 5.09475041

    const wrapper_height = wrapper_ref.current.clientHeight
    const scaled_width = svg_aspect_ratio * wrapper_height

    return scaled_width
  }

  /** Handle resize event */
  let handle_resize = (wrapper_ref: React.RefObject<HTMLDivElement>) => {
    if (wrapper_ref.current === null) {
      return
    }

    // Set wrapper length and rotation

    let { length, angle } = calc_transform(wrapper_ref)

    set_length(length)
    set_rotation(angle)

    // Set background svg width
    set_background_width(calc_background_svg_width(wrapper_ref))
  }

  // Component did mount
  useEffect(() => {
    handle_resize(wrapper_ref)

    window.onresize = () => handle_resize(wrapper_ref)

    // Component exit
    return () => {
      window.onresize = null
    }
  })

  return (
    <div ref={wrapper_ref} className="absolute flex flex-row w-full h-48 overflow-hidden bg-contain bg-repeat-x" style={{ transform: `rotate(${rotation}deg)`, width: `${length}px`, backgroundImage: `url("${BackgroundTextPath}")`, animation: 'bg-scroll 16s infinite linear' }}>
      <style>
        {
          `@keyframes bg-scroll { 0% { background-position: 0% } 100% { background-position: ${background_width}px } }`
        }
      </style>
    </div>
  )
}
