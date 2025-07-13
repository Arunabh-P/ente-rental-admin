import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface HighliteCardProps {
    text:string;
    goTo:string;
}
const HeightliteCard:FC<HighliteCardProps> = ({text,goTo}) => {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`${goTo}`)
    }
  return (
    <div className='h-[150px] flex items-center justify-center gap-2  bg-white border-2 border-black rounded-lg text-black  hover:bg-black hover:text-white cursor-pointer' onClick={handleClick}>
        <h4 className="uppercase font-medium text-[14px] lg:text-[16px]">{text}</h4>
    </div>
  )
}

export default HeightliteCard