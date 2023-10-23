package authenthication

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt"
)

// Key used for generating JWT's.
// Normally should be stored outside of code.
var jwtKey = []byte("secretKey")

/*
 * Struct for JWT Claims
 */
type JWTClaim struct {
	Id    uint   `json:"id"`
	Email string `json:"email"`
	jwt.StandardClaims
}

/*
 * Generate JWT. Takes in an e-mail and id as parameters.
 */
func GenerateJWT(email string, id uint) (tokenString string, err error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	// Generate a claim variable using the available data and expiration time.
	claims := JWTClaim{
		Id:    id,
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Generate the token using HS256 Signing Algorithms.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(jwtKey)

	return
}

/*
 * Validate Token.
 */
func ValidateToken(signedToken string) (uint, error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		},
	)

	if err != nil {
		return 0, err
	}

	claims, ok := token.Claims.(*JWTClaim)

	if !ok {
		err = errors.New("Could not parse claims.")
		return 0, err
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("Token expired.")
		return 0, err
	}

	return claims.Id, nil
}
