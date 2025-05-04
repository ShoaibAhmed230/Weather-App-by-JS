let inputValue = document.getElementById('weather-input'); // input field get ki he
let button = document.getElementById('getWeatherResult'); //btn get kia he
let userInputvalue =  document.getElementById('weather-result'); // user se value get ki or empty div me add kryga
let tempBox = document.getElementById('temp-div'); //temp aega is div me
let descBox = document.getElementById('description-div'); //temp aega is div me 
let cloudySVG = document.getElementById('cloud-svg'); //temp aega is div 
let sunnySVG = document.getElementById('sunny-svg'); //temp aega is div 
let cloudSunnySVG = document.getElementById('cloud-sunny-svg'); //temp aega is div 


button.addEventListener('click', function(event){
    event.preventDefault(); // Prevents form submission
    
    let enteredText = inputValue.value;
    userInputvalue.innerHTML = enteredText;

    inputValue.value =""; // clear input filed after submission
    

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ enteredText + '&appid=41d496f5b3f1a854e6e79910b71ba93f&units=metric')
    .then(response => {
        if(!response.ok){
            throw new Error ('city not found')
        }
        return response.json()
    } )
    .then(data => {
        const  temp = data.main.temp
        const description = data.weather[0].description.toLowerCase();
        // const descriptionSunny = data.weather[0].description = 'sunny';

        userInputvalue.innerHTML =` ${enteredText}`;
        tempBox.innerHTML = `${temp}°C`;
        descBox.innerHTML = description;

        if(description.includes('haze')){
            cloudySVG.style.display = 'block';
            sunnySVG.style.display = 'none'
            cloudSunnySVG.style.display = 'none';
        }else if(description.includes('sunny')){
            sunnySVG.style.display = 'block';
            cloudySVG.style.display = 'none';
            cloudSunnySVG.style.display = 'none';
        }else if(description.includes('broken clouds')){
            cloudSunnySVG.style.display = 'block';
            sunnySVG.style.display = 'none';
            cloudySVG.style.display = 'none';
        } else {
            sunnySVG.style.display = 'none';
            cloudySVG.style.display = 'none';
            cloudSunnySVG.style.display = 'none';

        }
        
        console.log(data)
    })
    .catch(error => {
        userInputvalue.innerHTML = error.message;
        console.error('Error weather fetching' , error)
    } )
    

    
});


const videoFiles = [
    'weather-videos/istockphoto-1267068206-640_adpp_is.mp4',
    'weather-videos/istockphoto-962500712-640_adpp_is.mp4',
    'weather-videos/istockphoto-1453863689-640_adpp_is.mp4',
    'weather-videos/istockphoto-908884142-640_adpp_is.mp4'
  ];
  
  let currentIndex = 0;
  let active = document.getElementById('video1');
  let next = document.getElementById('video2');
  
  function playVideo(index) {
    next.src = videoFiles[index];
    next.load();
    next.play();
  
    // Crossfade transition
    next.style.opacity = 1;
    active.style.opacity = 0;
  
    // After video ends, swap and play next
    next.onended = () => {
      // Rotate index
      currentIndex = (currentIndex + 1) % videoFiles.length;
  
      // Swap elements
      [active, next] = [next, active];
  
      playVideo(currentIndex);
    };
  }
  
  // Start the first video
  active.src = videoFiles[currentIndex];
  active.style.opacity = 1;
  active.play();
  currentIndex = (currentIndex + 1) % videoFiles.length;
  
  // Trigger the next video when first ends
  active.onended = () => {
    playVideo(currentIndex);
  };
  







