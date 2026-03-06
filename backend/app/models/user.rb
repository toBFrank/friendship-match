class User < ApplicationRecord
    has_many :responses
    has_many :class_enrollments
end
