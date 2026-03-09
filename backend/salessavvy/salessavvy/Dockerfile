<<<<<<< HEAD
FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/salessavvy-0.0.1-SNAPSHOT.jar"]
=======
FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/*.jar"]
>>>>>>> 96467cc2a171d8038de4a164513d9f8560ba5cd4
