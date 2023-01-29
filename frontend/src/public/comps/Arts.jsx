
import "../css/arts.css"

import img1 from "../images/5.webp"
import img2 from "../images/6.jpg"
import img3 from "../images/7.jpg"
import img4 from "../images/8.jpg"
import img5 from "../images/9.webp"
import karate from "../images/karate-combat.jpg"


const ShowMartInfo = ({ img, mart, info }) => {
    return (
        <div className="arts-box hide">
            <div className="image">
                <img src={img} alt="Boxing" />
                <div className="overlay">
                    <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                    <span className="image-line"></span>
                    <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                </div>
            </div>
            <div className="arts-text">
                <h2 className="mainfont">{mart}</h2>
                <p className="font">{info}</p>
            </div>
        </div>
    )
}


function Carousell() {
    return (

        <div className="martial-arts-page" id="martial-arts-page">
            <div className="text">
                <h1 className="mainfont">DIFFERENT MARTIAL ARTS</h1>
                <h3 className="font">DISCOVER THE MARTIAL ART THAT IS BEST FOR YOU</h3>
            </div>



            <div className="martial-arts">

                <ShowMartInfo img={img1} mart="Muay Thai"
                    info="A traditional martial art from Thailand renowned for its utilization of punches,
                    kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage,
                    fair play, and Excellence." />

                <ShowMartInfo img={img4} mart="Boxing"
                    info="A traditional martial art from Thailand renowned for its utilization of punches,
                    kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage,
                    fair play, and Excellence." />

                <ShowMartInfo img={img5} mart="Mixed Martial Arts"
                    info="A traditional martial art from Thailand renowned for its utilization of punches,
                    kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage,
                    fair play, and Excellence." />

                <ShowMartInfo img={karate} mart="Karate"
                    info="A striking art focusing on punches, kicks, knee strikes, elbow strikes and open-hand
                    techniques. Karate emphasis on discipline, focus, and perseverance, making it not just a 
                    way to learn self-defense, but also a way to improve mental and physical well-being." />

            </div>

        </div>

    )
}

export default Carousell