
import "../css/arts.css"

import img1 from "../images/5.webp"
import img2 from "../images/6.jpg"
import img3 from "../images/7.jpg"
import img4 from "../images/8.jpg"
import img5 from "../images/9.webp"



function Carousell() {
    return (

        <div className="martial-arts-page">
            <div className="text">
                <h1 className="mainfont">DIFFERENT MARTIAL ARTS</h1>
                <h3 className="font">DISCOVER THE MARTIAL ART THAT IS BEST FOR YOU</h3>
            </div>

            <div className="martial-arts">
                <div className="arts-box hide">
                    <div className="image">
                        <img src={img1} alt="muay thai" />
                        <div className="overlay">
                            <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                            <span className="image-line"></span>
                            <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                        </div>
                    </div>
                    <div className="arts-text">
                        <h2 className="mainfont">MUAY THAI</h2>
                        <p className="font">A traditional martial art from Thailand renowned for its utilization of punches, kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage, fair play, and Excellence.</p>
                    </div>
                </div>

                <div className="arts-box hide">
                    <div className="image">
                        <img src={img4} alt="Boxing" />
                        <div className="overlay">
                            <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                            <span className="image-line"></span>
                            <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                        </div>
                    </div>
                    <div className="arts-text">
                        <h2 className="mainfont">BOXING</h2>
                        <p className="font">A traditional martial art from Thailand renowned for its utilization of punches, kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage, fair play, and Excellence.</p>
                    </div>
                </div>



                <div className="arts-box hide">
                    <div className="image">
                        <img src={img5} alt="Boxing" />
                        <div className="overlay">
                            <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                            <span className="image-line"></span>
                            <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                        </div>
                    </div>
                    <div className="arts-text">
                        <h2 className="mainfont">MMA</h2>
                        <p className="font">A traditional martial art from Thailand renowned for its utilization of punches, kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage, fair play, and Excellence.</p>
                    </div>
                </div>

                <div className="arts-box hide">
                    <div className="image">
                        <img src={img3} alt="Boxing" />
                        <div className="overlay">
                            <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                            <span className="image-line"></span>
                            <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                        </div>
                    </div>
                    <div className="arts-text">
                        <h2 className="mainfont">KARATE</h2>
                        <p className="font">A traditional martial art from Thailand renowned for its utilization of punches, kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage, fair play, and Excellence.</p>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Carousell