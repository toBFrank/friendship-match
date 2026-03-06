class Api::MatchesController < ApplicationController
  def index
    user = User.find(params[:user_id])
    type = params[:type]

    matches =
      case type
      when "quick"
        quick_match(user)
      when "classes"
        class_match(user)
      when "detailed"
        detailed_match(user)
      else
        []
      end

    render json: matches
  end

  private

  def quick_match(user)
    # TODO: Implement match based on quick test
    results = User.where.not(id: user.id).limit(10)
  end

  def class_match(user)
    results = ClassMatchService.new(user).call
  end

  def detailed_match(user)
    # TODO: Implement match based on detailed test
    results = User.where.not(id: user.id).limit(10)
  end
end