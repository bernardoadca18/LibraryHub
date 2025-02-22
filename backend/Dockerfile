FROM maven:3.9-amazoncorretto-21-debian
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install
EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "target/*.jar" ]