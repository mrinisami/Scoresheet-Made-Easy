import React from 'react';
import { PlayerStats } from 'renderer/States/scoresheet';

interface Props {
  playing: string[];
  onAddPlayer: (id: string) => void;
  player: PlayerStats;
}

export default (props:Props) => {
    if (props.playing.includes(props.player.id))
}