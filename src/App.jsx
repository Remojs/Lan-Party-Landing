"use client"

import { useState } from "react";
import styles from "./App.module.css";
import gameData from "./assets/gamedata.json";
import optionalGames from "./assets/optionalgames.json";
import localGames from "./assets/localgamesdata.json";


export default function App() {
  const [openCards, setOpenCards] = useState([])

  const toggleCard = (id) => {
    setOpenCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id);
      } else {
        return [id]; // Ensure only one card is open at a time
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.purpleBlob1}></div>
        <div className={styles.purpleBlob2}></div>
        <div className={styles.purpleBlob3}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className={styles.gridPattern}></div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>LAN PARTY II: Official Game List</h1>
        <p className={styles.subtitle}>Lista de juegos oficial y obligatoria de la Lan Party. En caso de no tener las copias necesarias de un juego (5), descargarlo y no comprarlo aun, en caso de jugarlo en la lan party se compra en el momento, total ya esta descargado</p>
        <div className={styles.grid}>
          {gameData.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isOpen={openCards.includes(game.id)}
              onToggle={() => toggleCard(game.id)}
            />
          ))}
        </div>

        <h1 className={styles.title}>Juegos Opcionales</h1>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className={styles.grid}>
          {optionalGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isOpen={openCards.includes(game.id)}
              onToggle={() => toggleCard(game.id)}
            />
          ))}
        </div>

        <h1 className={styles.title}>Juegos en local - Pc Thiago</h1>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className={styles.grid}>
          {localGames.map((game) => (
            <div className={styles.card} key={game.id}>
              <div className={styles.imageContainer}>
                <img src={game.image} alt={game.title} className={styles.gameImage} />
              </div>
              <h3 className={styles.gameTitle}>{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GameCard({ game, isOpen, onToggle }) {
  return (
    <div className={styles.card}>
      {/* Number Circle */}
      {!isOpen && <div className={styles.numberCircle}>{game.copies}</div>}

      <div className={styles.cardContent}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img src={game.image || "/placeholder.svg"} alt={game.title} className={styles.gameImage} />
          <div className={styles.imageOverlay}></div>
          <h3 className={styles.gameTitle}>{game.title}</h3>
        </div>

        {/* Collapsible Content */}
        <div className={styles.collapsible}>
          <button className={`${styles.collapsibleTrigger} ${isOpen ? styles.open : ""}`} onClick={onToggle}>
            <span className={styles.detailsText}>Ver detalles</span>
            <svg
              className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>

          {/* Only render content when isOpen is true */}
          {isOpen && (
            <div className={styles.collapsibleContent}>
              <div className={styles.detailsContainer}>
                {/* Price */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Precio:</span>
                  <span className={styles.price}>{game.price}</span>
                </div>

                {/* Copies */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Copias:</span>
                  <span className={styles.detailValue}>{game.copies}</span>
                </div>

                {/* Owners */}
                <div className={styles.ownersSection}>
                  <span className={styles.detailLabel}>Propietarios:</span>
                  <div className={styles.ownersList}>
                    {game.owners.map((owner) => (
                      <span key={owner} className={styles.ownerTag}>
                        {owner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Game Features */}
                <div className={styles.featuresSection}>
                  <span className={styles.detailLabel}>Características:</span>
                  <div className={styles.featuresList}>
                    {game.isMultiplayer && (
                      <div className={styles.featureTag}>
                        <span>👥</span>
                        Multijugador
                      </div>
                    )}
                    {game.isCooperative && (
                      <div className={styles.featureTag}>
                        <span>🎮</span>
                        Cooperativo
                      </div>
                    )}
                    {game.isSurvival && (
                      <div className={styles.featureTag}>
                        <span>🛡️</span>
                        Survival
                      </div>
                    )}
                    {game.isShooter && (
                      <div className={styles.featureTag}>
                        <span>🎯</span>
                        Shooter
                      </div>
                    )}
                  </div>
                </div>

                {/* Player Count */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Jugadores:</span>
                  <span className={styles.detailValue}>{game.playerCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
