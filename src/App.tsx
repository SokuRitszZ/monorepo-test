import { buildGame, LifeCycle, NewGenerator } from '@soku-games/core'

import 'soku-game-reversi';
import 'soku-game-reversi_solid_renderer';
import 'soku-game-recorder';
import { TRecord, TRecordPlayer } from 'soku-game-recorder';
import { createSignal, onMount } from 'solid-js';

function App() {
  const game = buildGame({
    name: 'reversi',
    plugins: [
      {
        name: 'reversi_solid_renderer',
        extra: {
          control: true,
        }
      }, 
      'reversi-validator',
      {
        name: 'record-renderer',
      }
    ],
  })!;

  const { resultPromise } = game.bundler;

  const record = createSignal<TRecord>();

  resultPromise.then((r: any) => {
    record[1](r);
  });

  onMount(() => {
    const generator = NewGenerator('reversi');
    const initData = generator.generate(8, 8);
    game.prepare(initData);
    game.subscribe(LifeCycle.AFTER_END, (reason) => {
      console.log(reason);
    });
    game.start();
  });

  return (
    <div>
      <h1>hello</h1>
      <div id={'reversi-game'}></div>
      <RecordPlayer
        record={record[0]()} 
        name={'reversi'} 
        print={() => {}}
      />
    </div>
  );
}

export default App

function RecordPlayer(props: {
  record?: TRecord;
  name: string;
  print: (view: string) => void;
}) {
  let recordPlayer: TRecordPlayer;

  function handleLoad() {
    const game = buildGame({
      name: props.name,
      plugins: [
        {
          name: `${props.name}_lit_renderer`,
          extra: {
            print: props.print,
          },
        },
        'record-controller',
      ],
    })!;
    recordPlayer = game.bundler.recordPlayer;
    recordPlayer.prepare(props.record!);
  }

  let timer: number;
  function handlePlay() {
    timer = setInterval(() => {
      if (!recordPlayer.step()) {
        clearInterval(timer);
      }
    }, 1000);
  }

  function handlePause() {
    clearInterval(timer);
  }

  function handleLeft() {
    recordPlayer.revStep();
  }

  function handleRight() {
    recordPlayer.step();
  }
  return (
    <div style={{ 'margin-top': '30px' }}>
      <button onClick={handleLoad}>load</button>
      <button onClick={handlePlay}>play</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleLeft}>{'<'}</button>
      <button onClick={handleRight}>{'>'}</button>
    </div>
  );
}
