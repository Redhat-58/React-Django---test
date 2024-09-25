import os
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
from web3 import Web3

load_dotenv()

DEBUG = os.getenv('DEBUG')
INFURA_PROJECT_ID = os.getenv('INFURA_PROJECT_ID')

class RegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = get_user_model()
        fields = ("first_name", "last_name", "email", "password", "password2", "wallet_address")
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True}
        }

    def save(self):
        user = get_user_model()(
            email=self.validated_data["email"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            wallet_address=self.validated_data["wallet_address"]
        )

        # Calculate eth_balance
        w3 = Web3(Web3.HTTPProvider(f'https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}'))
        balance_wei = w3.eth.get_balance(user.wallet_address)
        user.eth_balance = w3.from_wei(balance_wei, 'ether')

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Passwords do not match!"})

        user.set_password(password)
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "is_staff", "first_name", "last_name", "wallet_address", "eth_balance")
