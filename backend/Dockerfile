# Étape 1 : image de base Java 21
FROM eclipse-temurin:21-jdk

# Étape 2 : dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier le jar de ton app dans le conteneur
COPY target/*.jar app.jar

# Étape 4 : exposer le port de ton application (par défaut Spring Boot = 8080)
EXPOSE 8080

# Étape 5 : lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
