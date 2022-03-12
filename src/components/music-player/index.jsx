import { useAudio } from "../search/useAudio";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import { ReactComponent as PrevIcon } from "../../assets/prev.svg";
import { ReactComponent as ForwIcon } from "../../assets/forw.svg";
import classes from "./styles.module.scss";

const MusicPlayer = (track) => {
    const { preview_url } = track;
    const { isPlaying, handlePlay } = useAudio(preview_url);
    return (
    <div className={classes.root}>
        <div className={classes.player}>
          <div className={classes.controls}>
            <PrevIcon fill="white" />
              <div className={classes.playPauseBtn} onClick={handlePlay}>
                  {isPlaying ? <PauseIcon height={22} /> : <PlayIcon height={22} />}
              </div>
              <ForwIcon fill="white" />
          </div>
          <div className={classes.track} />
        </div>
    </div>
  )
}

export default MusicPlayer;