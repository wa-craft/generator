OPTS=

ifdef OPTS
	OPTS=OPTS
endif

.PHONY:all
all: run

.PHONY: vendor
vendor:
	deno vendor --force craft.ts

.PHONY: cache
cache:
	deno cache -r craft.ts

.PHONY: bundle
bundle: vendor
	deno bundle craft.ts craft.bundle.ts

.PHONY: compile
compile: vendor
	deno compile -A --import-map vendor/import_map.json craft.ts

.PHONY:bin
bin: compile

.PHONY:run_dev
run_dev:
	deno run -A --import-map vendor/import_map.json craft.ts

.PHONY:cms
run_dev:
	deno run -A craft.ts gen -c example/cms.yaml

.PHONY:run
run: vendor
	@deno run -A --import-map vendor/import_map.json craft.ts $(OPTS)

.PHONY:build
build: bundle