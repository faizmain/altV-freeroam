import alt, { Player } from 'alt-server'

interface GunGameScore {
  score: number
}

class GunGameServer {
  private positions = [
    {
      pos: new alt.Vector3(935.96, 2406.119, 51.083),
      rot: new alt.Vector3(0, 0, 2.275799512863159)
    },
    {
      pos: new alt.Vector3(1087.424, 2236.681, 44.765),
      rot: new alt.Vector3(0, 0, 0.5442129373550415)
    },
    {
      pos: new alt.Vector3(932.782, 2379.349, 46.989),
      rot: new alt.Vector3(0, 0, 1.6821125745773315)
    },
    {
      pos: new alt.Vector3(923.051, 2273.275, 48.741),
      rot: new alt.Vector3(0, 0, 1.2368475198745728)
    },
    {
      pos: new alt.Vector3(1049.341, 2492.018, 49.365),
      rot: new alt.Vector3(0, 0, 2.9684340953826904)
    },
    {
      pos: new alt.Vector3(979.899, 2431.477, 51.319),
      rot: new alt.Vector3(0, 0, 2.3747472763061523)
    },
    {
      pos: new alt.Vector3(962.571, 2339.077, 48.371),
      rot: new alt.Vector3(0, 0, -2.721064567565918)
    },
    {
      pos: new alt.Vector3(865.965, 2348.69, 51.673),
      rot: new alt.Vector3(0, 0, 2.275799512863159)
    },
    {
      pos: new alt.Vector3(991.859, 2361.758, 51.606),
      rot: new alt.Vector3(0, 0, 2.5231688022613525)
    }
  ];
  private weapons: number[] = [324215364, 736523883, 2937143193, 487013001, 1141786504, 487013001, 2481070269, 1119849093, 3686625920, 1737195953, 615608432];
  private playersInGame: Set<Player> = new Set();
  private scoreBoard: Map<number, GunGameScore> = new Map();

  constructor() {
    alt.onClient("gunGame::playerJoin", (player: Player) => this.playerJoin(player));
    alt.on("playerDeath", (player: Player, killer: Player, weapon: number) => this.playerDeath(player, killer, weapon));
    alt.on("playerDisconnect", (player: Player) => this.playerLeave(player));

    this.start();
  }

  private start(): void {
    alt.setTimeout(() => this.over.bind(this), 900000);
    alt.emitClient(null, "gunGame::start");
  }

  private over(): void {
    this.start();
    
    this.playersInGame.forEach((player: Player): void => {
      if (this.playersInGame.has(player)) {
        this.playerRespawn(player);
      }
    });

    alt.emitClient(null, "gunGame::over");
  }

  private playerJoin(player: Player): void {
    this.playersInGame.add(player);
    this.scoreBoard.set(player.id, { score: 0 });

    this.playerRespawn(player);
    alt.emitClient(null, 'gunGame::updateOnline', alt.Player.all.length++);
  }

  private playerUpdateScore(player: Player, weapon: number): void {
    if (this.playersInGame.has(player)) {
      const scoreBoard = this.scoreBoard.get(player.id);
      if (weapon !== this.weapons[scoreBoard.score]) return;
      scoreBoard.score++;

      player.removeAllWeapons();
      player.giveWeapon(this.weapons[scoreBoard.score], 9999, true);

      alt.emitClient(null, "gunGame::updateScoreBoard", this.scoreBoard);
    }
  }

  private playerRespawn(player: Player): void {
    if (this.playersInGame.has(player)) {
      const data = this.positions[1];
      const scoreBoard = this.scoreBoard.get(player.id);

      player.spawn(data.pos.x, data.pos.y, data.pos.z, 0);
      player.rot = data.rot;

      player.removeAllWeapons();
      player.giveWeapon(this.weapons[scoreBoard.score], 9999, true);

      alt.emitClient(player, 'gunGame::playerRespawn')
    }
  }

  private playerDeath(player: Player, killer: Player, weapon: number): void {
    if (this.playersInGame.has(player) && this.playersInGame.has(killer)) {
      player.removeAllWeapons();

      setTimeout(() => this.playerRespawn(player), 2000);
      alt.emitClient(null, 'gunGame::updateKillList', killer.name, player.name, weapon)
      this.playerUpdateScore(killer, weapon);
    }
  }

  private playerLeave(player: Player): void {
    if (this.playersInGame.has(player)) {
      this.playersInGame.delete(player);
      this.scoreBoard.delete(player.id);

      alt.emitClient(null, "gunGame::updateScoreBoard", this.scoreBoard);
      alt.emitClient(null, 'gunGame::updateOnline', alt.Player.all.length--);
    }
  }
}

export default new GunGameServer()