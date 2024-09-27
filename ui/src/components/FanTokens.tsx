import React, { useRef, useState } from "react"; // Örneğin Avatar componenti buradan olabilir
import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import { Avatar } from "@nextui-org/react";

const FanTokens: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
      scrollRef.current.style.cursor = "grabbing"; // Grabbing cursor aktif ediliyor
    }
  };

  const mouseLeaveHandler = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"; // Cursor eski haline dönüyor
    }
  };

  const mouseUpHandler = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"; // Mouse bırakıldığında grab cursor
    }
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Hız için multiplier (isteğe göre ayarlanabilir)
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div
      className="scroll-container py-5 gap-5 z-0"
      ref={scrollRef}
      onMouseDown={mouseDownHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}>
      {CONTRACT_ADRESSES.FAN_TOKENS.map((item: any, index: number) => (
        <div
          className="scroll-item"
          key={`FANTOKEN_${index}`}
          onClick={() => console.log("Clicked on", item.name)}>
          <Avatar draggable={false} src={item.logoURI} className="w-20 h-20" />
        </div>
      ))}
    </div>
  );
};

export default FanTokens;
