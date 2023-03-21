if country and indicators:
   linkAPI = checkCountry(country)
   linkAPI = checkIndic(indicators, linkAPI)
elif country is None:
   linkAPI = 'https://api.tradingeconomics.com/country/all/'
   linkAPI = checkIndic(indicators, linkAPI)
elif indicators is None:
   linkAPI = checkCountry(country)
else:
   linkAPI = 'https://api.tradingeconomics.com/indicators'"