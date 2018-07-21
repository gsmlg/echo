HOST=echo.gsmlg.org
PORT=10000

default:
	@echo make conf create nginx conf

conf:
	sed 's/<HOST>/${HOST}/g' nginx.conf | sed 's/<PORT>/${PORT}/g' 
