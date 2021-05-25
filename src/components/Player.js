import React,{useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay , faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong,isPlaying,setIsPlaying}) =>{
    const audioRef = useRef(null);
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!setIsPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);

        }
    }
    const timeUpdateHandeler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo,currentTime:current,duration});
    };
    const getTime = (time)=>{
        return(
            Math.floor(time / 60) +  ":" + ("0" + Math.floor(time % 60)).slice(-2) 
        )
    }
    const dradHandeler = (e) =>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    };
    const [songInfo,setSongInfo] = useState({
        currentTime: 0,
        duration: 0

    });
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dradHandeler} type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="play-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay}/>
                <FontAwesomeIcon className="play-forward" size="2x" icon={faAngleRight}/>
                

            </div>
            <audio onTimeUpdate={timeUpdateHandeler} onLoadedMetadata={timeUpdateHandeler} ref={audioRef} src={currentSong.audio}></audio>
            </div>
    )
}
export default Player;