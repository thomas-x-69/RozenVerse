import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StarryBackground from "./StarryBackground";
import slide1 from "../assets/section1.png";
import slide2 from "../assets/section1-2.png";
import slide3 from "../assets/section1-3.png";
import LOGO from "../assets/LOGO.png";
import earthBackground from "../assets/section2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: slide1, title: "Explore the solar system" },
  { image: slide2, title: "Discover gas giants" },
  { image: slide3, title: "Explore The Habitable Zone" },
];

const LandingPage = ({ allItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderStates, setSliderStates] = useState({
    planets: 0,
    asteroids: 0,
    // nearObjects: 0,
    dwarfPlanets: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const planetsRef = useRef(null);
  const asteroidsRef = useRef(null);
  const aboutUsRef = useRef(null);

  // const nearObjectsRef = useRef(null);
  const dwarfPlanetsRef = useRef(null);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allItems]);

  const handleExplore = () => {
    window.location.href = "https://rozenverse-simulation.netlify.app/";
  };

  const handlePrev = (section) => {
    setSliderStates((prev) => ({
      ...prev,
      [section]: prev[section] === 0 ? 0 : prev[section] - 1,
    }));
  };

  const handleNext = (section, itemsLength) => {
    setSliderStates((prev) => ({
      ...prev,
      [section]:
        prev[section] === itemsLength - 4 ? itemsLength - 4 : prev[section] + 1,
    }));
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      scrollToSection(searchResultsRef);
    }
  };
  const AboutUs = () => (
    <section
      ref={aboutUsRef}
      className="relative mb-12 overflow-hidden rounded-3xl mt-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(${earthBackground})`,
          filter: "brightness(0.4)",
        }}
      />
      <div className="relative z-10 px-8 py-20 text-white">
        <h2 className="text-5xl font-bold mb-10">About Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-lg mb-4">
              At Rozen Verse, we're passionate about bringing the wonders of the
              universe to your fingertips. Our mission is to inspire curiosity
              and foster a deep appreciation for the cosmos through interactive
              experiences and comprehensive information.
            </p>
            <p className="text-lg mb-4">
              Founded by a team of space enthusiasts and astrophysicists, we
              strive to make complex astronomical concepts accessible to
              everyone. Whether you're a seasoned astronomer or just starting
              your cosmic journey, Rozen Verse is your gateway to the stars.
            </p>
            <p className="text-lg">
              Join us as we explore the solar system, uncover the mysteries of
              distant galaxies, and celebrate the beauty of our universe. The
              cosmos is calling – are you ready to answer?
            </p>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <ul className="list-disc list-inside">
                <li className="mb-2">Educate and inspire space enthusiasts</li>
                <li className="mb-2">
                  Provide accurate, up-to-date cosmic information
                </li>
                <li className="mb-2">
                  Create immersive space exploration experiences
                </li>
                <li>Foster a global community of stargazers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const CardItem = ({ item }) => (
    <div className="w-full h-80 px-3">
      <div className="relative h-full rounded-3xl overflow-hidden group backdrop-blur-[1px]">
        <div className="absolute inset-0 bg-white hover:backdrop-blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex-1 flex justify-between">
            <p className="text-sm w-[10rem] line-clamp-6 h-[7.5rem] text-ellipsis overflow-hidden">
              {item.description}
            </p>

            <img
              src={item.img}
              alt={item.name}
              className="w-[15rem] h-[15rem] object-cover rounded-lg mt-[-6rem] mr-[-6rem]"
            />
          </div>
          <div className="flex-1 flex items-end justify-between">
            <img
              src={item.coreImg}
              alt={`${item.name} alternative view`}
              className="w-[15rem] h-[15rem] object-cover rounded-lg mb-[-6rem] ml-[-6rem]"
            />
            <p className="text-sm max-w-[50%] text-right mt-8 line-clamp-5 text-ellipsis overflow-hidden">
              {item.detailText}
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bg-orange-500 p-2 transform translate-y-[-40px] group-hover:translate-y-[0px] transition-transform duration-300 flex justify-around">
          {item.name}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-orange-500 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-around">
          <Link to={`/planet/${item.name}`} className="w-full text-center">
            see more
          </Link>
        </div>
      </div>
    </div>
  );
  const CardItem2 = ({ item }) => (
    <div className="w-full h-80 px-3">
      <div className="relative h-full rounded-3xl overflow-hidden group backdrop-blur-[1px]">
        <div className="absolute inset-0 bg-white hover:backdrop-blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex-1 flex justify-between">
            <p className="text-md w-[10rem]  h-[16.5rem] overflow-hidden">
              {item.description}
              {console.log(item.name)}
            </p>

            <img
              src={item.img}
              alt={item.name}
              className="w-[15rem] h-[15rem] object-cover rounded-lg mt-[-6rem] mr-[-6rem]"
            />
          </div>
          <div className="flex-1 flex items-end justify-between">
            {/* <p className="text-sm max-w-[50%] text-right mt-8 line-clamp-5 text-ellipsis overflow-hidden">
              {item.detailText}
            </p> */}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bg-orange-500 p-2 transform translate-y-[-40px] group-hover:translate-y-[0px] transition-transform duration-300 flex justify-around">
          {item.name}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-orange-500 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-around">
          <Link to={`/planet/${item.name}`} className="w-full text-center">
            see more
          </Link>
        </div>
      </div>
    </div>
  );

  const CardSlider = ({ items, title, refProp, section }) => (
    <section ref={refProp}>
      <h2 className="text-5xl font-bold mb-10 mt-20">{title}</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${sliderStates[section] * 25}%)`,
          }}
        >
          {items.map((item) => (
            <div key={item.name} className="w-1/4 flex-shrink-0">
              <CardItem item={item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handlePrev(section)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleNext(section, items.length)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );

  const CardSlider2 = ({ items, title, refProp, section }) => (
    <section ref={refProp}>
      <h2 className="text-5xl font-bold mb-10 mt-20">{title}</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${sliderStates[section] * 25}%)`,
          }}
        >
          {items.map((item) => (
            <div key={item.name} className="w-1/4 flex-shrink-0">
              <CardItem2 item={item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handlePrev(section)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleNext(section, items.length)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );

  return (
    <div
      className={`min-h-screen text-white transition-all duration-1000 ease-in-out ${
        isLoading ? "scale-150 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <StarryBackground className="scale-[0.5]" />

      <div className="relative z-10 mt-4 mx-20">
        <header className="flex justify-between items-center p-4">
          <Link to="/">
            <img src={LOGO} alt="Rozen Verse" className="h-10" />
          </Link>
          <div className="flex items-center"></div>
          <nav className="flex space-x-24 items-center font-bold text-[18px] ">
            <a
              href="#"
              className="hover:text-gray-300"
              onClick={() => scrollToSection(planetsRef)}
            >
              Planets
            </a>
            <a
              href="#"
              className="hover:text-gray-300"
              onClick={() => scrollToSection(asteroidsRef)}
            >
              Asteroids
            </a>
            {/* <a
              href="#"
              className="hover:text-gray-300"
              onClick={() => scrollToSection(nearObjectsRef)}
            >
              Near Objects
            </a> */}
            <a
              href="#"
              className="hover:text-gray-300"
              onClick={() => scrollToSection(dwarfPlanetsRef)}
            >
              Dwarf Planets
            </a>
            <a href="#" className="hover:text-gray-300">
              About Us
            </a>
          </nav>
          <button
            onClick={handleExplore}
            className="bg-white text-black px-6 py-2 rounded-[12px]"
          >
            Explore
          </button>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Slider section */}
          <div>
            <div className="relative h-[400px] rounded-3xl mb-12 overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute bg-cover inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute">
                    <div className="p-12">
                      <h1 className="text-6xl font-bold mb-6 mt-[4rem] w-[24rem]">
                        {slide.title}
                      </h1>

                      <button
                        onClick={handleExplore}
                        className="bg-orange-500  text-white px-8 py-3 rounded-[12px] text-lg"
                      >
                        Explore Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-[33rem] left-1/2 transform -translate-x-1/2 flex space-x-2 ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-6 h-3 rounded-full  ${
                    index === currentSlide
                      ? "bg-orange-500"
                      : "bg-white bg-opacity-50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Search section */}
          <section className="relative mb-12 overflow-hidden rounded-3xl mt-14">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${earthBackground})`,
                filter: "brightness(0.7)",
              }}
            />
            <div className="relative z-10 px-8 py-28 text-white text-center">
              <h2 className="text-3xl  mb-2">Search for..</h2>
              <h3 className="text-6xl font-bold mb-8">
                Planets, Asteroids, Near objects
              </h3>
              <div className="relative bottom-[-4rem]">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pr-12 rounded-[14px] bg-white bg-opacity-90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Search results */}
          {searchResults.length > 0 && (
            <section ref={searchResultsRef}>
              <h2 className="text-5xl font-bold mb-10 mt-20">Search Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((item) => (
                  <CardItem key={item.name} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Category sections */}
          <CardSlider
            items={allItems.filter((item) => item.type === "planet")}
            title="Planets"
            refProp={planetsRef}
            section="planets"
          />
          {/* <CardSlider
            items={allItems.filter((item) => item.type === "nearObject")}
            title="Near Objects"
            refProp={nearObjectsRef}
            section="nearObjects"
          /> */}
          <CardSlider2
            items={allItems.filter((item) => item.type === "dwarfPlanet")}
            title="Dwarf Planets"
            refProp={dwarfPlanetsRef}
            section="dwarfPlanets"
          />
          <CardSlider2
            items={allItems.filter((item) => item.type === "asteroid")}
            title="Asteroids"
            refProp={asteroidsRef}
            section="asteroids"
          />
          <AboutUs />
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
