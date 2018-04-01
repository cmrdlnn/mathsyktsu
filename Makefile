run:
	bin/rails server -b 0.0.0.0

run-dev:
	WEBPACK_PATH=http://0.0.0.0:8080 bin/rails server -b 0.0.0.0

provision:
	cd cm && ansible-playbook provisioning/dev.yml -i inventory -u vagrant -c local

migrate:
	rails db:migrate

npm:
	npm i

webpack:
	npm run dev

webpack-prod:
	npm run production

webpack-dev:
	@runner=`whoami` ; \
	if test $$runner == "vagrant" ; \
	then \
		echo "*******************************************************************" ; \
		echo "* Hot reload теряет свою эффективность внутри виртуальной машины, *" ; \
		echo "* поэтому для чистоты конфига эта возможность отсутствует.        *" ; \
		echo "* Выполните make run-dev на хостовой машине.                      *" ; \
		echo "*******************************************************************" ; \
	else \
		echo $$runner ; \
		npm run start ; \
	fi
