# frozen_string_literal: true

require 'jwt'

class JsonWebToken
  class << self
    def encode(payload)
      payload.reverse_merge!(meta)
      JWT.encode(payload, secret)
    end

    def decode(token)
      JWT.decode(token, secret)
    end

    def valid_payload(payload)
      return false if expired(payload)
      true
    end

    private

    def meta
      {
        created_at: Time.now.to_i,
        exp: 7.days.from_now.to_i
      }
    end

    def expired(payload)
      Time.at(payload['exp']).utc < Time.now.utc
    end

    def secret
      Rails.application.secrets.secret_key_base
    end
  end
end
