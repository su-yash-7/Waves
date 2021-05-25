import React,{useState,useRef} from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./util";
import Library from './components/Library'
import Nav from './components/Nav'
function App() {
  const audioRef = useRef(null);
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
        currentTime: 0,
        duration: 0

    });
  const [libraryStatus,setLibraryStatus] = useState(false);
    const timeUpdateHandeler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo,currentTime:current,duration});
    };
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo} songInfo={songInfo}/>
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandeler} onLoadedMetadata={timeUpdateHandeler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
    
  );
}

export default App;
