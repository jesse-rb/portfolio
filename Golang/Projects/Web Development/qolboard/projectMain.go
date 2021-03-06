package projectMain // Renamed from main to projectMain only for portfolio display purposes to stop confusing Heroku

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"qolboard/handlers"
	"time"
)

func redirectToHTTPS(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if os.Getenv("APP_ENV") == "production" { // If in production environment
			if r.Header.Get("x-forwarded-proto") != "https" { // If this was not a https request
				urlHTTPS := "https://" + r.Host + r.RequestURI // Reconstruct https url and redirect client
				http.Redirect(w, r, urlHTTPS, http.StatusPermanentRedirect)
				return // Don't serve default handler
			}
		}
		// Serve default handler
		handler.ServeHTTP(w, r)
	})
}

func projectMain() { // Renamed from main to projectMain only for portfolio display purposes to stop confusing Heroku
	l := log.New(os.Stdout, "main => ", log.LstdFlags)
	// Create handlers
	roomsManager := handlers.NewRoomsManager()

	// Create new serve mux
	sm := http.NewServeMux()
	// Register handlers
	sm.HandleFunc("/roomsmanager", func(w http.ResponseWriter, r *http.Request) {
		roomsManager.ServeWebsocket(w, r)
	})
	sm.Handle("/", http.FileServer(http.Dir("./static")))

	// Grab standard port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	// Create new server
	s := &http.Server{
		Addr:         ":" + port,
		Handler:      redirectToHTTPS(sm),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	// Start server
	go func() {
		l.Println("Starting server on port " + port)

		err := s.ListenAndServe()
		// err := http.ListenAndServe(":" + port, redirectToHTTPS(sm))

		if err != nil {
			l.Fatal(err)
		}
	}()

	// Graceful shutdown with interrupt or kill signals
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	l.Println("Recieved terminate, graceful shutdown", sig)

	tc, cancelFunc := context.WithTimeout(context.Background(), 30*time.Second)
	cancelFunc()
	s.Shutdown(tc)
}
