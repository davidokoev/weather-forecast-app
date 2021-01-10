# 5 Day Weather Forecast App Test Assignment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Description

You can search weather forecast for 5 days at any location or city.

## Packages Used

```sh
@material-ui/core
@material-ui/lab
@types/jest
@types/node
@types/react
@types/react-dom
axios
typescript
```

## Instructions

Run React App
```sh
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## User Interface

### Search Form
![](https://user-images.githubusercontent.com/9249084/103439384-dab29580-4c55-11eb-8949-b2f3bcf95b84.JPG)
### Forecast results
![](https://user-images.githubusercontent.com/9249084/103439438-5dd3eb80-4c56-11eb-8e1e-92cf5925655f.JPG)
### Not found location
![](https://user-images.githubusercontent.com/9249084/103439446-704e2500-4c56-11eb-9c27-f3787322c927.JPG)

## React Components Structure
App
  - Layout
    - Forecast
       - SearchForm
       - Cards
         - Card
    
## API Reference
[5 day / 3 hour Forecast Data from Open Weather](https://openweathermap.org/forecast5)

## Additional Info
useMemo hook usage example in `src\containers\Forecast\Forecast.js` file.
