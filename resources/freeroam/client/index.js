import alt from "alt-client";
import game from "natives";

class GunGameClient {
  constructor() {
    this.browser = new alt.WebView('http://176.112.230.1:8080');
    this.browser.on('browser::loaded', () => alt.emitServer('gunGame::playerJoin'))

    game.setPedDefaultComponentVariation(alt.Player.local.scriptID);
    alt.onServer('gunGame::start', () => this.start());
    alt.onServer('gunGame::updateScoreBoard', () => this.updateScoreBoard());
    alt.onServer('gunGame::playerRespawn', () => this.playerRespawn());
    alt.onServer('gunGame::updateOnline', (online) => this.updateOnline(online));
    alt.onServer('gunGame::updateKillList', (killer, player, weapon) => this.updateKillList(killer, player, weapon));
    alt.onServer('gunGame::over', () => this.over());

  }

  start() {

  }

  updateScoreBoard(scoreBoard) {

  }

  updateOnline(online) {
    this.browser.emit('browser::commit', 'updateOnline', online);
  }

  playerRespawn() {
    game.clearPedBloodDamage(alt.Player.local.scriptID);
    game.setEntityInvincible(alt.Player.local.scriptID, true);
    game.setEntityAlpha(alt.Player.local.scriptID, 150);
    game.setEntityCollision(alt.Player.local.scriptID, true, false);

    const interval = alt.setInterval(() => {
      if (game.isControlPressed(0, 24)) {
        game.setEntityInvincible(alt.Player.local.scriptID, false);
        game.setEntityAlpha(alt.Player.local.scriptID, 255);
        game.setEntityCollision(alt.Player.local.scriptID, true, true);
        alt.clearInterval(interval);
      }
    }, 0)
  }

  updateKillList(killer, victim, weapon) {
    this.browser.emit('browser::commit', 'addKillToList', {
      killer, victim, weapon
    });
  } 

  over() {

  }
}

export default new GunGameClient();