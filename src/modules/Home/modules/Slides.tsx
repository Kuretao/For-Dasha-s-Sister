import React, {useRef, useState, useCallback} from "react";
import styled from "styled-components";

function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

const VideoBackground = styled.video`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    z-index: 1;
    pointer-events: none; 
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
`;

const ScrollContainer = styled.div`
    position: relative;
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always;
    scroll-behavior: smooth;
    scrollbar-width: none;
    z-index: 3;

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

const Slide = styled.section`
    min-width: 100%;
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 10vh 10vw;

    h1, h2 {
        font-size: 48px;
    }

    p {
        font-size: 20px;
    }
`;

type SlideId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function Slides() {
    const [show3, setShow3] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show7, setShow7] = useState(false);

    const refs: Record<SlideId, React.RefObject<HTMLElement | null>> = {
        1: useRef<HTMLElement>(null),
        2: useRef<HTMLElement>(null),
        3: useRef<HTMLElement>(null),
        4: useRef<HTMLElement>(null),
        5: useRef<HTMLElement>(null),
        6: useRef<HTMLElement>(null),
        7: useRef<HTMLElement>(null),
    };

    const containerRef = useRef<HTMLDivElement>(null);

    const goTo = (id: SlideId) => {
        const el = refs[id].current;
        if (el) {
            el.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    const handleWheel = useCallback(
        throttle((e: React.WheelEvent<HTMLDivElement>) => {
            e.preventDefault();

            if (!containerRef.current) return;

            const currentScroll = containerRef.current.scrollTop;
            const slideHeight = window.innerHeight;
            const currentSlide = Math.round(currentScroll / slideHeight);

            const delta = e.deltaY > 0 ? 1 : -1;

            const visibleSlideNumbers = [1, 2, 4, 6].filter((n) =>
                n === 3 ? show3 : n === 5 ? show5 : n === 7 ? show7 : true
            );

            const currentIndex = visibleSlideNumbers.indexOf(currentSlide as any);
            const targetIndex = Math.max(0, Math.min(visibleSlideNumbers.length - 1, currentIndex + delta));
            const targetSlide = visibleSlideNumbers[targetIndex];


        }, 100),
        [show3, show5, show7, refs]
    );

    return (
        <>
            <VideoBackground
                autoPlay
                muted
                loop
                playsInline
                src="/src/assets/medium-vecteezy_abstract-plexus-background-4k_1794444_medium.mp4"
            />

            <Overlay/>

            <ScrollContainer ref={containerRef} onWheel={handleWheel}>
                <Slide ref={refs[1]} style={{textAlign: "right", alignItems: "end"}}>
                    <h1 onClick={() => {
                        requestAnimationFrame(() => goTo(2));
                    }} style={{width: '60%'}}>Интерактивный
                        медицинский справочник
                        и протоколы
                        для врачей-онкологов</h1>
                </Slide>

                <Slide ref={refs[2]}>
                    <h2>Несколько типов глиом головного мозга</h2><br/>
                    <h2
                        onClick={() => {
                            setShow3(true);
                            requestAnimationFrame(() => goTo(3));
                        }}
                    >
                        Строцитома
                    </h2> <br/>
                    <p>Развивается из астроцитов — глиальных клеток, имеющих форму
                        звезды <br/>
                        Особенности:<br/>
                        У взрослых — чаще всего в белом веществе полушарий, у детей — в
                        мозжечке и стволе мозга. <br/>
                        Внутри опухоли часто образуются кисты, которые растут медленно,
                        но могут достигнуть больших размеров. <br/>
                        Проявления зависят от локализации: общие (слабость, потеря
                        аппетита, головные боли) и очаговые (нарушения координации,
                        галлюцинации, расстройства речи, изменение поведения)</p>
                </Slide>

                {show3 && (
                    <Slide ref={refs[3]} style={{flexDirection: "row"}}>
                        <div>
                            <h2 style={{marginBottom: 16}}>Строцитома головного мозга</h2>
                            <p>Первичная
                                внутримозговая нейроэпителиальная (глиальная)
                                опухоль, берущая свое начало из звездчатых
                                клеток (астроцитов). Астроцитома головного
                                мозга может иметь различную степень
                                злокачественности. Ее проявления зависят от
                                локализации и подразделяются на общие
                                (слабость, потеря аппетита, головные боли) и
                                очаговые (гемипарез, гемигипестезия,
                                нарушения координации, галлюцинации,
                                расстройства речи, изменение поведения). </p>

                            <br/>

                            <p>
                                Общие симптомы астроцитомы связаны с
                                обусловленным ею повышением
                                внутричерепного давления, ирритативным
                                (раздражающим) воздействием и
                            </p>
                        </div>

                        <img src="/src/assets/Без названия3.jpg" alt="Картинка 3" width="300"/>
                    </Slide>
                )}

                <Slide ref={refs[4]}>
                    <h2 onClick={() => {
                        setShow5(true);
                        requestAnimationFrame(() => goTo(5));
                    }} style={{marginBottom: 16}}>Эпендимома</h2>
                    <p>Образуется из клеток эпендимы — тонкого слоя, выстилающего
                        внутреннее пространство желудочков головного мозга и
                        центрального спинномозгового канала.
                        Особенности:
                        В головном мозге — преимущественно располагается в задней
                        черепной ямке, в области четвёртого мозгового желудочка.
                        Может иметь как доброкачественный, так и злокачественный
                        характер.
                        Симптомы зависят от локализации: головные боли, головокружения,
                        тошнота и рвота, шаткость походки, дискоординация движений,
                        нарушение слуховых или зрительных функций.
                        Основной метод лечения — хирургическое удаление опухоли.</p>
                </Slide>

                {show5 && (
                    <Slide ref={refs[5]}>
                        <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                            <div>
                                <h2>Эпендимома головного мозга
                                </h2>
                                <p>Это опухоль из
                                    эпендимальной ткани желудочковой системы
                                    головного мозга. Клинически проявляется, прежде
                                    всего, признаками повышенного внутричерепного
                                    давления, а также атаксией, нарушениями со стороны
                                    зрения и слуха, судорожными приступами,
                                    нарушением речи и глотания</p>
                            </div>
                            <img src="/src/assets/Без названия2.jpg" alt="Картинка 5" width="500"/>
                        </div>
                        <h2>Симптомы эпендимомы
                        </h2>
                        <p>Эпендимома головного мозга манифестирует
                            признаками внутричерепной гипертензии:
                            нарастающей головной болью, ощущением давления в
                            глазных яблоках, независимой от приема пищи
                            тошнотой, рвотой. Наряду с этим у многих пациентов
                            наблюдается раздражительность, некоторые
                            изменения в привычном поведении, атаксия —
                            неуклюжесть и шаткость ходьбы, дискоординация </p>
                    </Slide>
                )}

                <Slide ref={refs[6]}>
                    <h2 onClick={() => {
                        setShow7(true);
                        requestAnimationFrame(() => goTo(7));
                    }}>Олигодендроглиома</h2>
                    <p>Возникает из олигодендроцитов — клеток, поддерживающих и
                        защищающих нервные клетки в головном и спинном мозге. <br/>
                        Особенности: <br/>
                        Обычно растёт медленно и классифицируется как глиомы низкой
                        степени злокачественности (II степень по классификации ВОЗ). <br/>
                        Однако встречаются и более агрессивные варианты (III степень —
                        анапластическая олигодендроглиома). <br/>
                        Симптомы зависят от локализации и темпов роста опухоли:
                        эпилептические припадки, головная боль, тошнота, рвота,
                        очаговые неврологические симптомы — парезы, нарушения
                        чувствительности, зрения, речи.</p>
                </Slide>

                {show7 && (
                    <Slide ref={refs[7]}>
                        <h2>Олигодендроглиома головного мозга</h2>
                        <img src="/src/assets/Без%20названия.png" alt="Картинка 7" width="300"/>
                        <p>Это первичная
                            злокачественная опухоль ЦНС, которая развивается из
                            олигодендроцитов головного или спинного мозга.
                            Причиной заболевания выступают молекулярно-
                            генетические патологии: мутации IDH1 и IDH2,
                            делеции 1p и 19q, метилирование MGMT. Симптомы
                            включают парциальные и генерализованные
                            судороги, интенсивные головные боли, нарушения
                            чувствительности, моторных функций и когнитивных
                            способностей. Диагностика проводится по
                            результатам КТ и МРТ мозга, гистологического,
                            иммуногистохимического и генетического анализов.
                            Программа лечения состоит из хирургического
                            вмешательства для удаления опухоли, курсов
                            химиотерапии и лучевой терапии.</p>
                    </Slide>
                )}
            </ScrollContainer></>
    )
        ;
}
