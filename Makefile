OPTS=

ifdef OPTS
	OPTS=OPTS
endif

.PHONY:all
all: run

.PHONY: vendor
vendor:
	deno vendor --force wag.ts
	clear

.PHONY:run_dev
run_dev:
	deno run -A --import-map vendor/import_map.json wag.ts

.PHONY:run
run: vendor
	@deno run -A --import-map vendor/import_map.json wag.ts $(OPTS)

.PHONY:build
build: vendor
	deno bundle wag.ts wag.bundle.ts