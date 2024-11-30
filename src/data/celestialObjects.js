import Mercury from "../assets/images/mercury.jpg";
import MercuryCore from "../assets/images/MercuryCore.jpg";
import Venus from "../assets/images/venus.jpg";
import VenusCore from "../assets/images/VenusCore.jpg";
import Earth from "../assets/images/earth.png";
import EarthCore from "../assets/images/EarthCore.jpg";
import Mars from "../assets/images/Mars.jpg";
import MarsCore from "../assets/images/MarsCore.jpg";
import Jupiter from "../assets/images/Jupiter.jpg";
import JupiterCore from "../assets/images/JupiterCore.png";
import Saturn from "../assets/images/saturn.jpg";
import SaturnCore from "../assets/images/saturnCore.jpg";
import Uranus from "../assets/images/Uranus.png";
import UranusCore from "../assets/images/UranusCore.png";
import Neptune from "../assets/images/Neptun.jpg";
import NeptuneCore from "../assets/images/NeptunCore.jpg";
import haumea from "../assets/images/haumea.png";
import eris from "../assets/images/eris.png";
import pluto from "../assets/images/pluto.png";
import ceres from "../assets/images/ceres.png";
import MakeMake from "../assets/images/MakeMake.png";
import Didymos from "../assets/images/didymos.png";
import Bennu from "../assets/images/bennu.png";
import Apophis from "../assets/images/apophis.png";
import Itokawa from "../assets/images/itokawa.png";

export const planets = [
  {
    name: "Mercury",
    img: Mercury,
    coreImg: MercuryCore,
    description:
      "It is the smallest planet in the Solar System and has extreme temperature variations. Has no moons. During the day, temperatures on the surface can reach 800 degrees Fahrenheit (430 degrees Celsius). Because the planet has no atmosphere to retain that heat. Not habitable.",
    detailText:
      "Mercury's surface resembles that of Earth's Moon, scarred by many impact craters resulting from collisions with meteoroids and comets. Has rocky, heavily cratered surface; lacks an atmosphere.",
    type: "planet",
  },
  {
    name: "Venus",
    img: Venus,
    coreImg: VenusCore,
    description:
      "Venus is the third brightest object in the sky after the Sun and Moon. Has no moons. Not habitable. Hottest planet due to greenhouse gases.",
    detailText:
      "The Sun would rise in the west and set in the east, because Venus spins backward compared to Earth. The structure is similar to Earth.",
    type: "planet",
  },
  {
    name: "Earth",
    img: Earth,
    coreImg: EarthCore,
    description:
      "Color: Blue and white (due to water and clouds). Diameter: 12,742 km (7,918 miles) – reference size (100%). Moons: 1 (The Moon). Popular Observatories: Mauna Kea Observatories, Palomar Observatory. Surrounding: Diverse environments with liquid water. Distance from Sun: 149.6 million km (93 million miles). Habitable Zone: Yes.",
    detailText:
      "Only known planet with life; supports a wide range of ecosystems.",
    type: "planet",
  },
  {
    name: "Mars",
    img: Mars,
    coreImg: MarsCore,
    description:
      "Color: Red, due to iron oxide (rust). Moons: 2 (Phobos and Deimos). Habitable: No, but has potential for past life. Has the largest volcano and canyon in the Solar System.",
    detailText:
      "Mars has a wealth of raw materials that can be converted into resources for human survival.",
    type: "planet",
  },
  {
    name: "Jupiter",
    img: Jupiter,
    coreImg: JupiterCore,
    description:
      "Jupiter is the fifth planet from the Sun, and the largest in the solar system – more than twice as massive as the other planets combined. Moons: 80 known (notable: Io, Europa, Ganymede, Callisto) also known as the Galilean moons. The gravity of Jupiter does help protect us from some comets. Gas giant with a thick atmosphere and a Great Red Spot. Not habitable.",
    detailText:
      "Largest planet in the Solar System; has a strong magnetic field. As a gas giant, Jupiter doesn't have a true surface. The planet is mostly swirling gases and liquids.",
    type: "planet",
  },
  {
    name: "Saturn",
    img: Saturn,
    coreImg: SaturnCore,
    description:
      "Moons: 83 known (notable: Titan, Rhea). Not habitable. Surrounding: Gas giant with a complex ring system. The seven main rings are labeled in the order in which they were discovered: D, C, B, A, F, G and E.",
    detailText:
      "The particles in Saturn's rings are composed primarily of water ice and range in size from microns to tens of meters. Saturn is a massive ball made mostly of hydrogen and helium.",
    type: "planet",
  },
  {
    name: "Uranus",
    img: Uranus,
    coreImg: UranusCore,
    description:
      "Not habitable. Rotates on its side. A year in Uranian time is about 84 Earth years.",
    detailText:
      "Uranus' atmosphere is mostly hydrogen and helium, with a small amount of methane and traces of water and ammonia. The methane gives Uranus its signature blue color.",
    type: "planet",
  },
  {
    name: "Neptune",
    img: Neptune,
    coreImg: NeptuneCore,
    description:
      "Moons: 16 known (notable: Triton, Nereid). Not habitable. Farthest planet from the Sun; has a Great Dark Spot. Neptune makes a complete orbit around the Sun (a year in Neptunian time) in about 165 Earth years.",
    detailText:
      "Neptune has at least five main rings and four prominent ring arcs, the main rings are named Galle, Leverrier, Lassell, Arago, and Adams.",
    type: "planet",
  },
];
export const dwarfPlanets = [
  {
    name: "Pluto",
    img: pluto,
    description:
      "Moons: 5 known (notable: Charon). Pluto was long considered our solar system's ninth planet. But after the discovery of similar worlds deeper in the Kuiper Belt, Pluto was reclassified as a dwarf planet in 2006 by the International Astronomical Union. Pluto's surface has mountains, valleys, plains, and craters. The temperature on Pluto can be as cold as -375 to -400 degrees Fahrenheit. Not habitable.",
    detailText:
      "Pluto is located in the Trans-Neptunian region (beyond Neptune) where other objects might cross Pluto's orbital path.",
    type: "dwarfPlanet",
  },
  {
    name: "Eris",
    img: eris,
    description:
      "Eris is one of the largest dwarf planets in our solar system. It's about the same size as Pluto, but it's three times farther from the Sun. Moons: 1 known (Dysnomia).",
    detailText: "Eris most likely has a rocky surface similar to Pluto.",
    type: "dwarfPlanet",
  },
  {
    name: "Haumea",
    img: haumea,
    description: "Color: grey. Moons: 2 known (Hi'iaka and Namaka).",
    detailText:
      "Has a unique shape; one of the largest known Kuiper Belt objects.",
    type: "dwarfPlanet",
  },
  {
    name: "Makemake",
    img: MakeMake,
    description:
      "Moons: 1 known (MK 2). It takes about 305 Earth years for this dwarf planet to make one trip around the Sun.",
    detailText:
      "Makemake is one of the largest known objects in the Kuiper Belt.",
    type: "dwarfPlanet",
  },
  {
    name: "Ceres",
    img: ceres,
    description:
      "Dwarf planet Ceres is the largest object in the asteroid belt between Mars and Jupiter, and it's the only dwarf planet located in the inner solar system. Ceres is more like the terrestrial planets (Mercury, Venus, Earth, and Mars) than its asteroid neighbors, but it is much less dense.",
    detailText:
      "Ceres has a very thin atmosphere, and there is evidence it contains water vapor. When NASA's Dawn arrived in 2015, Ceres became the first dwarf planet to receive a visit from a spacecraft.",
    type: "dwarfPlanet",
  },
];

export const asteroids = [
  {
    name: "Didymos and Dimorphos",
    img: Didymos,
    description:
      "Didymos and its small moonlet Dimorphos make up a binary asteroid system – meaning the small moon (Dimorphos) orbits the larger body (Didymos).",
    detailText: "Not a threat but targeted by NASA for research purposes.",
    type: "asteroid",
  },
  {
    name: "Bennu",
    img: Bennu,
    description:
      "Bennu is a small, near-Earth asteroid that passes close to Earth about every six years.",
    detailText:
      "It was the target of NASA's OSIRIS-REx mission to collect an asteroid sample and bring it to Earth.",
    type: "asteroid",
  },
  {
    name: "Apophis",
    img: Apophis,
    description:
      "When discovered in 2004, Apophis was identified as one of the most hazardous asteroids that could impact Earth.",
    detailText:
      "A radar observation campaign in March 2021, combined with precise orbit analysis, allowed astronomers to conclude that there is no risk of Apophis impacting our planet for at least a century.",
    type: "asteroid",
  },
  {
    name: "Itokawa",
    img: Itokawa,
    description:
      "Itokawa is part of what remains from a much larger object that was shattered by a collision.",
    detailText:
      "The dust confirms that S-type asteroids like Itokawa, which are the most common type of asteroid in the inner main belt, are the source of the most common kind of meteorite found on Earth.",
    type: "asteroid",
  },
];

export const allCelestialBodies = [...planets, ...dwarfPlanets, ...asteroids];
