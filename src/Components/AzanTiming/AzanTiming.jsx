import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import style from './AzanTiming.module.scss'
import Select from 'react-select';
import { Azkar } from 'islam.js'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AzanTiming() {

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    const movingZikrRef = useRef(null);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);
    
    // Calculate and set animation duration based on content width
    const calculateAnimationDuration = () => {
        if (movingZikrRef.current) {
        const totalWidth = movingZikrRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const duration = (totalWidth / 2 + windowWidth) / 20; // Adjust speed as needed
        movingZikrRef.current.style.animationDuration = `${duration}s`;
        }
    };

    const countryData = {
        EG: { name: 'Egypt', cities: ['Cairo', 'Alexandria', 'Giza', "Sharm El Sheikh", "Hurghada", "Luxor", "Aswan", "Port Said", "Suez", "Mansoura", "Tanta", "Ismailia", "Damanhur", "Beni Suef", "Zagazig" ] },
        US: {
            name: 'United States',
            states: {
                'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse'],
                'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
                'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
                'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
                'Illinois': ['Chicago', 'Springfield', 'Naperville', 'Rockford', 'Peoria'],
                'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
                'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
                'Georgia': ['Atlanta', 'Augusta', 'Savannah', 'Columbus', 'Macon'],
                'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
                'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
                'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
                'Virginia': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
                'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
                'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
                'Massachusetts': ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
                'Tennessee': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
                'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
                'Missouri': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
                'Maryland': ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
                'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
                'Colorado': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'],
            }
        },
        SA: { name: 'Saudi Arabia', cities: ['Riyadh', 'Jeddah', 'Mecca', "Medina", "Dammam", "Khobar", "Dhahran", "Abha", "Tabuk", "Khamis Mushait", "Najran", "Buraidah", "Hafar Al-Batin", "Jubail", "Yanbu", "Qatif", "Al-Ahsa", "Al-Mubarraz", "Al-Khobar", "Al-Diriyah"] },
        AE: { name: 'United Arab Emirates', cities: ['Abu Dhabi', 'Dubai', 'Sharjah', "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al-Quwain", "Al Ain", "Al Gulaya", "Khalifa City", "Al Wathba", "Liwa", "Dibba Al-Fujairah", "Hatta", "Al Shuwaib", "Al Faqa", "Masfout", "Jebel Ali", "Madinat Zayed", "Al Dhaid"] },
        GB: { name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', "Liverpool", "Newcastle upon Tyne", "Sheffield", "Leeds", "Bristol", "Glasgow", "Edinburgh", "Cardiff", "Coventry", "Nottingham", "Leicester", "Belfast", "Brighton", "Hull", "Stoke-on-Trent", "Bradford", "Aberdeen", "Swansea"] },
        FR: { name: 'France', cities: ['Paris', "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Étienne", "Toulon", "Le Havre", "Grenoble", "Dijon", "Nîmes", "Aix-en-Provence", "Angers", "Saint-Denis"] },
        CA: { name: 'Canada', cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg", "Hamilton", "Kitchener", "Halifax", "Victoria", "London", "Oshawa", "Barrie", "Saskatoon", "St. Catharines", "Regina", "Sudbury", "Sherbrooke"] },
        DE: { name: 'Germany', cities: ['Berlin', "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Mannheim", "Karlsruhe"] },
        IN: { name: 'India', cities: ["Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Patna", "Indore", "Thane", "Bhopal", "Coimbatore", "Agra", "Madurai"] },
        PK: { name: 'Pakistan', cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Sialkot", "Bahawalpur", "Sukkur", "Larkana", "Mardan", "Abbottabad", "Gujrat", "Muzaffargarh", "Kasur", "Dera Ghazi Khan"] },
        ID: { name: 'Indonesia', cities: ['Jakarta', "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Batam", "Denpasar", "Palembang", "Tangerang", "Depok", "Malang", "Padang", "Bogor", "Pekanbaru", "Banjarmasin", "Bandar Lampung", "Mataram", "Yogyakarta", "Ambon"] },
        TR: { name: 'Turkey', cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya", "Konya", "Gaziantep", "Kayseri", "Mersin", "Eskisehir", "Sakarya", "Kocaeli", "Trabzon", "Manisa", "Aydin", "Diyarbakir", "Bolu", "Tekirdag", "Malatya"] },
        DZ: { name: 'Algeria', cities: ['Algiers', "Oran", "Constantine", "Annaba", "Blida", "Batna", "Setif", "Al-Mujahid", "Tlemcen", "Biskra", "Bejaia", "Tizi Ouzou", "El Oued", "Tipaza", "Khenchela", "Laghouat", "Saida", "Sidi Bel Abbes", "Relizane", "Ouargla"] },
        MA: { name: 'Morocco', cities: ['Rabat', "Casablanca", "Marrakesh", "Fes", "Tangier", "Agadir", "Oujda", "Kenitra", "Temara", "Meknes", "Safi", "El Jadida", "Beni Mellal", "Taza", "Nador", "Larache", "Essaouira", "Ksar es Souk", "Settat", "Ifrane"] },
        QA: { name: 'Qatar', cities: ['Doha', "Al Rayyan", "Al Wakrah", "Al Khor", "Umm Salal", "Madinat ash Shamal", "Al Daayen", "Al Khawr", "Al Shahaniya", "Al Gharafa", "Al Sheehaniya", "Mesaieed", "Al Wukair", "Al Jumail", "Qatar University City"] },
        BR: { name: 'Brazil', cities: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia', 'Belém', 'São Luís', 'Maceió', 'Natal', 'Teresina', 'Campo Grande', 'João Pessoa', 'Aracaju', 'Palmas', 'Vitória'] },
        RU: { name: 'Russia', cities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Rostov-on-Don', 'Ufa', 'Samara', 'Krasnoyarsk', 'Voronezh', 'Saratov', 'Tyumen', 'Togliatti', 'Irvinsk', 'Krasnodar', 'Tver', 'Barnaul'] },
        MX: { name: 'Mexico', cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Mérida', 'Cancún', 'Querétaro', 'San Luis Potosí', 'Oaxaca', 'Toluca', 'Chihuahua', 'Veracruz', 'Hermosillo', 'Saltillo', 'Morelia', 'Aguascalientes', 'Torreón', 'Culiacán'] },
        NG: { name: 'Nigeria', cities: ['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Kano', 'Benin City', 'Maiduguri', 'Zaria', 'Jos', 'Ilorin', 'Enugu', 'Abeokuta', 'Kaduna', 'Onitsha', 'Calabar', 'Uyo', 'Owerri', 'Warri', 'Lafia', 'Sokoto'] },
        JP: { name: 'Japan', cities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama', 'Hiroshima', 'Sendai', 'Chiba', 'Kitakyushu', 'Niigata', 'Kumamoto', 'Shizuoka', 'Okayama', 'Nagasaki', 'Hachioji'] },
        KR: { name: 'South Korea', cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam', 'Goyang', 'Jeonju', 'Cheongju', 'Jeju City', 'Anyang', 'Pyeongtaek', 'Namyangju', 'Gwangmyeong', 'Wonju', 'Iksan'] },
        AR: { name: 'Argentina', cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'La Plata', 'Mendoza', 'Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan', 'Neuquén', 'Posadas', 'Bahía Blanca', 'San Luis', 'Corrientes', 'Rio Cuarto', 'Santiago del Estero', 'Resistencia', 'Paraná', 'Villa María'] },
        PH: { name: 'Philippines', cities: ['Quezon City', 'Manila', 'Cebu City', 'Davao City', 'Zamboanga City', 'Antipolo', 'Pasig', 'Taguig', 'Cagayan de Oro', 'Iloilo City', 'General Santos', 'Bacoor', 'Dasmariñas', 'Makati', 'San Jose del Monte', 'Las Piñas', 'Marikina', 'Tarlac', 'Naga City', 'Lapu-Lapu'] },
        IT: { name: 'Italy', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Venice', 'Verona', 'Messina', 'Trieste', 'Padua', 'Taranto', 'Brescia', 'Prato', 'Parma', 'Modena'] },
        ES: { name: 'Spain', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', `L'Hospitalet de Llobregat`, 'Granada', 'Elche', 'Oviedo', 'Burgos'] },
        PT: { name: 'Portugal', cities: ['Lisbon', 'Porto', 'Coimbra', 'Braga', 'Aveiro', 'Funchal', 'Évora', 'Setúbal', 'Vila Nova de Gaia', 'Cascais'] },
        CL: { name: 'Chile', cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Puerto Montt', 'Iquique', 'Talca'] },
        CO: { name: 'Colombia', cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Pereira', 'Santa Marta', 'Bucaramanga', 'Manizales'] },
        NZ: { name: 'New Zealand', cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin', 'Palmerston North', 'Napier', 'Nelson', 'Rotorua'] },
        SG: { name: 'Singapore', cities: ['Singapore'] }, 
        GR: { name: 'Greece', cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Kalamata', 'Rhodes', 'Chania', 'Corfu'] },
        NO: { name: 'Norway', cities: ['Oslo', 'Bergen', 'Stavanger', 'Drammen', 'Kristiansand', 'Bodø', 'Ålesund', 'Tromsø', 'Sandnes', 'Haugesund'] },
        FI: { name: 'Finland', cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyvaskyla', 'Lahti', 'Kuopio', 'Pori'] },
        HU: { name: 'Hungary', cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Érd'] },
        RO: { name: 'Romania', cities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Brașov', 'Galați', 'Ploiești', 'Oradea', 'Sibiu'] },
    };

    const [monthOption, setMonthOption] = useState([])

    useEffect( () => {

        const monthOptions = [
            { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
            { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
            { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
            { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
        ];

        setMonthOption(monthOptions)

    }, [] )
    
    const [yearOption, setYearOption] = useState([])

    useEffect( () => {
        const yearOptions = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => ({
            value: 1990 + i,
            label: (1990 + i).toString()
        }));
        setYearOption(yearOptions)
    }, [] )

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [prayersTime, setPrayersTime] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPrayer, setNextPrayer] = useState('');
    const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('EG'); // Default
    const [selectedCity, setSelectedCity] = useState(countryData['EG'].cities[0]); // Default
    const [cityOptions, setCityOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [countryChoosen, setCountryChoosen] = useState(false)


    const [monthMilady, setMonthMilady] = useState('')
    const [monthHijri, setMonthHijri] = useState('')

    // Handle country change
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption.value);
        
        // setSelectedCity(countryData[selectedOption.value].cities[0]); 
        // setSelectedState(countryData[selectedOption.value].states['New York']); // Reset state when country changes
        // setSelectedCity(countryData[selectedOption.value].states[0]); // Reset city when country changes

        if (selectedOption.value === 'US') {
            setStateOptions(Object.keys(countryData.US.states).map(state => ({
                value: state,
                label: state,
            })));
            setSelectedState(null); // Reset state
            setCityOptions([]); // Reset city options
            setSelectedCity(null); // Reset city selection
            setCountryChoosen(true)
        } else {
            setStateOptions([]); // Reset states if country is not US
            setSelectedCity(countryData[selectedOption.value].cities[0]); // Set to first city in the new country
            setSelectedState(null); // Ensure selected state is null if not US
            setCountryChoosen(false)
        }
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setSelectedCity(null); // Reset city when state changes
    
        // Set the city options based on the selected state
        if (selectedOption) {
            const cities = countryData.US.states[selectedOption.value];
            setCityOptions(cities.map(city => ({
                value: city,
                label: city,
            })));
            setSelectedCity(cities[0]); // Optionally set the first city as selected
        } else {
            setCityOptions([]); // Reset cities if no state is selected
            setSelectedCity(null); // Ensure selected city is also null
        }
    };
    

    // Handle city change
    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption.value);
    };

    useEffect(() => {
        const fetchPrayersTimeForMonth = async () => {
            try {
                // Helper function to format date as DD-MM-YYYY
                const formatDate = (date) => {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                };
    
                const dates = [];
                const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    
                // Generate all dates for the current month
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(selectedYear, selectedMonth - 1, day); // Adjust for zero-based month
                    dates.push(formatDate(date));
                }
    
                // Fetch prayer times for each date in the month
                const timingsPromises = dates.map( async (date) => {
                    try {
                        const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/${date}?address=${selectedCity},${selectedCountry}`);
                
                        const data = response.data;
                
                        return data.data;
                        } catch {
                            return null; 
                        }
                    }
                );
    
                const allTimings = await Promise.all(timingsPromises);
                
                const validTimings = allTimings.filter(item => item !== null);
                const validDates = dates.filter((_, index) => allTimings[index] !== null);
            
                const prayersByDate = validDates.reduce((acc, date, index) => {
                    acc[date] = validTimings[index];
                    return acc;
                }, {});
    
                setPrayersTime(prayersByDate); 
            
                const firstDateKey = Object.keys(prayersByDate)[0]; 
                const firstTimings = prayersByDate[firstDateKey];
                
                if (firstTimings) {
                    setMonthMilady(firstTimings.date.gregorian.month.en); 
                    setMonthHijri(firstTimings.date.hijri.month.en); 
                }
            
                findNextPrayer(prayersByDate); 
            } catch {
            } finally {
                setLoading(false);
            }
        };
    
        fetchPrayersTimeForMonth();
    
        const interval = setInterval(() => {
            if (Object.keys(prayersTime).length > 0) {
                findNextPrayer(prayersTime); // Recalculate every minute
            }
        }, 60000); 
    
        return () => clearInterval(interval); // Clean up the interval
    }, [prayersTime, selectedCity, selectedCountry, selectedMonth, selectedYear]);

    // useEffect(() => {
    //     setCityOptions(countryData[selectedCountry].cities.map(city => ({ value: city, label: city })));
    //     setSelectedCity(countryData[selectedCountry].cities[0]);
    // }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry) { // Ensure selectedCountry is not null or undefined
            // const countryKey = selectedCountry.value; // Extract the value from the selected country object
            
            // if (countryData[countryKey]) { // Check if the countryKey exists in countryData
                if (countryChoosen) {
                    setStateOptions(Object.keys(countryData.US.states).map(state => ({
                        value: state,
                        label: state,
                    })));
                    setSelectedState(null); // Reset state
                    setCityOptions([]); // Reset city options
                    setSelectedCity(null); // Reset city selection
                    setCountryChoosen(true)
                } else {
                    setCityOptions(countryData[selectedCountry].cities.map(city => ({ value: city, label: city })));
                    setSelectedCity(countryData[selectedCountry].cities[0]); // Set the first city as the default
                }
            // } else {
            //     setCityOptions([]); // If countryKey is not found, reset city options
            //     setSelectedCity(null); // Reset selected city
            // }
        } else {
            setCityOptions([]); // Reset city options if selectedCountry is null
            setSelectedCity(null); // Reset selected city
        }
    }, [selectedCountry]);
    

    useEffect(() => {
        const options = Object.keys(countryData).map(code => ({
            value: code,
            label: countryData[code].name
        }));
        setCountryOptions(options);
    }, []);

    const [minTiming, setMinTiming] = useState(10)
    const [hourTiming, setHourTiming] = useState(10)

    // Function to find the next prayer time
    const findNextPrayer = (azan) => {
        const now = new Date();
        const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        let foundNextPrayer = false;
    
        for (let i = 0; i < prayerNames.length; i++) {
            const prayerTime = azan[prayerNames[i]];
    
            const [hours, minutes] = prayerTime.split(':').map(Number);
            const prayerDate = new Date();
            prayerDate.setHours(hours);
            prayerDate.setMinutes(minutes);
            prayerDate.setSeconds(0);
    
            if (prayerDate > now) {
                setNextPrayer(prayerNames[i]);
                foundNextPrayer = true;
                break;
            }
        }
    
        if (!foundNextPrayer) {
            setNextPrayer('Fajr');
        }
    };

    if (loading) {
        return <p className={`${style.loading} ${style.section}`}>Loading, Please wait <span className={style.loader}></span></p>; 
    }  

    const text = 'Azan Timing'

    const h3Variants = {

        hidden: {
            opacity: 0
        },

        visible : {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }

    }

    const spanVariants = {

        hidden: {
            opacity: 0
        },

        visible : {
            opacity: 1
        }

    }

    const variants = {
        hidden: { opacity: 0, y: -500 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
    };

    const toUp = {
        hidden: { opacity: 0, y: 500 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
                
                <div  className={`text-center mb-5`}>
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Timing</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                        {text.split('').map( (char, index) => 
                        
                            <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                        
                        )}

                    </motion.h3>
                
                </div>
            
            </div>
        
            <div className="container">
            
            <div className="d-flex justify-content-between align-items-center my-4">
                    <div style={{ width: '45%' }}>
                        <Select
                            options={yearOption}
                            value={yearOption.find(option => option.value === selectedYear) || null}
                            onChange={option => setSelectedYear(option.value)}
                            placeholder="Select Year"
                        />
                    </div>
                    <div style={{ width: '45%' }}>
                        <Select
                            options={monthOption}
                            value={monthOption.find(option => option.value === selectedMonth) || null}
                            onChange={option => setSelectedMonth(option.value)}
                            placeholder="Select Month"
                        />
                    </div>
            </div>

            <div className="d-flex justify-content-between align-items-center my-4">
                    <div style={{ width: countryChoosen ? '30%' : '45%' }}>
                        <Select
                            options={countryOptions}
                            value={countryOptions.find(option => option.value === selectedCountry) || null}
                            onChange={handleCountryChange}
                            placeholder="Select Country"
                        />
                    </div>

                    {countryChoosen && (
                        <div style={{ width: '20%' }}>
                            <Select
                                options={stateOptions}
                                value={stateOptions.find(option => option.value === selectedState?.value) || null}
                                onChange={handleStateChange}
                                placeholder="Select State"
                            />
                        </div>
                    )}

                    <div style={{ width: countryChoosen ? '30%' : '45%' }}>
                        <Select
                            options={cityOptions}
                            value={cityOptions.find(option => option.value === selectedCity) || null}
                            onChange={handleCityChange}
                            placeholder="Select City"
                        />
                    </div>
                </div>

                <div className="table-responsive">

                    <table className="table table-dark table-striped table-hover  mt-3 text-center">
                    
                    <thead>

                        <tr>

                            <th>{monthMilady}</th>
                            <th>{monthHijri}</th>
                            <th>Fajr	</th>
                            <th>Sunrise</th>
                            <th>Dhuhr</th>
                            <th>Asr</th>
                            <th>Maghrib</th>
                            <th>Isha</th>

                        </tr>

                    </thead>
                
                    <tbody>

                        {Object.entries(prayersTime).map(([date, timings], index) => {
                            // Check if timings is defined to avoid accessing properties of undefined
                            if (!timings || !timings.date) {
                                return null; // Skip this entry if timings is undefined
                            }
                        
                            const currentHijriMonth = timings.date.hijri.month.en;

                            const today = new Date();
                            const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
                        
                            // Check if the current date is today
                            const isToday = timings.date.gregorian.date === formattedToday;

                            const showMonthRow = index > 0 && currentHijriMonth !== prayersTime[Object.keys(prayersTime)[index - 1]].date.hijri.month.en;

                            return (
                                <React.Fragment key={date}>
                                    {showMonthRow && (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                {currentHijriMonth} {timings.date.hijri.year}
                                            </td>
                                        </tr>
                                    )}
                                    
                                    <tr className={`${isToday ? style.tableActive : ''} ${style.tableRow}`}>
                                        <td>{timings.date.gregorian.day} {timings.date.gregorian.weekday.en.slice(0, 3)}</td>
                                        <td>{timings.date.hijri.day}</td>
                                        <td>{timings.timings.Fajr}</td>
                                        <td>{timings.timings.Sunrise}</td>
                                        <td>{timings.timings.Dhuhr}</td>
                                        <td>{timings.timings.Asr}</td>
                                        <td>{timings.timings.Maghrib}</td>
                                        <td>{timings.timings.Isha}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}

                    </tbody>
                
                    </table>

                </div>

            </div>
        
            <div className={style.zikrScroll}>
                
                    <div className={style.scrollContent}>

                        {Array.from(dataZikr.entries()).map( ([zkar, items], index) => (

                                <div key={index} className={style.box}>

                                    <ul>

                                        {items.map((item, key) => (
                                        
                                            <span key={key}>
                                                
                                                <li>
                                                <h4 >{zkar}</h4>
                                                    <p>{item.zikr}</p>
                                                    
                                                </li>
                                            
                                            </span>
                                        ))}

                                    </ul>

                                </div>
                        
                        ) )}

                    </div>
                
            </div>

        </div>
    
    )

}