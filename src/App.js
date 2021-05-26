import React,{useState,useRef} from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";
import Library from './components/Library'
import Nav from './components/Nav'
function App() {
  const audioRef = useRef(null);
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,

    });
  const [libraryStatus,setLibraryStatus] = useState(false);
    const timeUpdateHandeler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent/roundedDuration)*100);
        console.log(animation);
        setSongInfo({...songInfo,currentTime:current,duration,animationPercentage:animation});
    };
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo} songInfo={songInfo} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandeler} onLoadedMetadata={timeUpdateHandeler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
    
  );
}

export default App;
