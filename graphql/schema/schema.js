const graphql = require("graphql");
const User = require("../../models/Users");
const Trip = require("../../models/Trip");
const Itinerary = require("../../models/Itinerary");
const Clothing = require("../../models/Clothing");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    // function so it can interact with other graphql objects
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        trips: {
            type: new GraphQLList(TripType),
            resolve(parent, args) {
                return Trip.find({ user: parent._id })
            }
        }
    })
});

const TripType = new GraphQLObjectType({
    name: "Trip",
    fields: () => ({
        _id: { type: GraphQLID },
        // packingList: { type: GraphQLString },
        location: { type: GraphQLString },
        length: { type: GraphQLString },
        climate: { type: GraphQLString },
        traveler: { type: GraphQLString },
        luggage: { type: GraphQLString },
        apparel: { type: GraphQLString },

        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({ trips: parent._id })
            }
        },
        itinerary: {
            type: new GraphQLList(ItineraryType),
            resolve(parent, args) {
                return Itinerary.find({ trip: parent._id }).sort({ date: 1 })
            }
        }
    })
})

const ItineraryType = new GraphQLObjectType({
    name: "Itinerary",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) }
    })
})



const WomenType = new GraphQLObjectType({
    name: "Women",
    fields: () => ({
        name: { type: GraphQLString },
        weight: { type: GraphQLFloat },
        weatherId: { type: GraphQLList(GraphQLInt) },
        cold: {
            type: ColdType,
            resolve(parent, args) {
                return Cold.find({})
            }
        },
        desert: {
            type: DesertType,
            resolve(parent, args) {
                return Desert.find({})
            }
        },
        tropical: {
            type: TropicalType,
            resolve(parent, args) {
                return Tropical.find({})
            }
        },
        warm: {
            type: WarmType,
            resolve(parent, args) {
                return Warm.find({})
            }
        },
        seasonal: {
            type: SeasonalType,
            resolve(parent, args) {
                return Seasonal.find({})
            }
        }
    })
});

const NeutralType = new GraphQLObjectType({
    name: "Neutral",
    fields: () => ({
        name: { type: GraphQLString },
        weight: { type: GraphQLFloat },
        weatherId: { type: GraphQLList(GraphQLInt) },
        cold: {
            type: ColdType,
            resolve(parent, args) {
                return Cold.find({})
            }
        },
        desert: {
            type: DesertType,
            resolve(parent, args) {
                return Desert.find({})
            }
        },
        tropical: {
            type: TropicalType,
            resolve(parent, args) {
                return Tropical.find({})
            }
        },
        warm: {
            type: WarmType,
            resolve(parent, args) {
                return Warm.find({})
            }
        },
        seasonal: {
            type: SeasonalType,
            resolve(parent, args) {
                return Seasonal.find({})
            }
        }
    })
});

const ColdType = new GraphQLObjectType({
    name: "Cold",
    fields: () => ({
        name: { type: GraphQLString },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find({ weatherId: 1 })
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find({ weatherId: 1 })
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find({ weatherId: 1 })
            }
        }
    })
});

const DesertType = new GraphQLObjectType({
    name: "Desert",
    fields: () => ({
        name: { type: GraphQLString },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find({ weatherId: 2 })
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find({ weatherId: 2 })
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find({ weatherId: 2 })
            }
        }
    })
});

const TropicalType = new GraphQLObjectType({
    name: "Tropical",
    fields: () => ({
        name: { type: GraphQLString },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find({ weatherId: 3 })
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find({ weatherId: 3 })
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find({ weatherId: 3 })
            }
        }
    })
});

const WarmType = new GraphQLObjectType({
    name: "Warm",
    fields: () => ({
        name: { type: GraphQLString },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find({ weatherId: 4 })
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find({ weatherId: 4 })
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find({ weatherId: 4 })
            }
        }
    })
});

const SeasonalType = new GraphQLObjectType({
    name: "Seasonal",
    fields: () => ({
        name: { type: GraphQLString },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find({ weatherId: 5 })
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find({ weatherId: 5 })
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find({ weatherId: 5 })
            }
        }
    })
});

const ClothingType = new GraphQLObjectType({
    name: "Clothing",
    fields: () => ({
        name: {type: GraphQLString},
        weight: {type: GraphQLFloat},
        climate: { type: new GraphQLList(GraphQLString) },
        apparel: { type: GraphQLString }
    })
})

// how to initially jump into the graph to get data
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // the name of the field is how it will be refrenced in queries
        user: {
            type: UserType,
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return User.findById(args._id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        trip: {
            type: TripType,
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return Trip.findById(args._id)
            }
        },
        trips: {
            type: new GraphQLList(TripType),
            resolve() {
                return Trip.find({})
            }
        },
        mens: {
            type: new GraphQLList(MenType),
            resolve(parent, args) {
                return Men.find();
            }
        },
        womens: {
            type: new GraphQLList(WomenType),
            resolve(parent, args) {
                return Women.find();
            }
        },
        neutrals: {
            type: new GraphQLList(NeutralType),
            resolve(parent, args) {
                return Neutral.find();
            }
        },
        cold: {
            type: ColdType,
            resolve(parent, args) {
                return Cold.find({});
            }
        },
        desert: {
            type: DesertType,
            resolve(parent, args) {
                return Desert.find({});
            }
        },
        tropical: {
            type: TropicalType,
            resolve(parent, args) {
                return Tropical.find({});
            }
        },
        warm: {
            type: WarmType,
            resolve(parent, args) {
                return Warm.find({});
            }
        },
        seasonal: {
            type: SeasonalType,
            resolve(parent, args) {
                return Seasonal.find({});
            }
        },
        clothing: {
            type: new GraphQLList(ClothingType),
            args: {
                apparel: { type: GraphQLString },
                climate: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Clothing.find({ climate: args.climate, apparel: args.apparel })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                // using the mongoose model
                let user = new User({
                    username: args.username,
                    password: args.password,
                    name: args.name
                })
                user.password = user.generateHash(args.password);
                // save to the mongo db and return the object that was inserted
                return user.save()
            },
            resolve(parent, args) {
                // using the mongoose model
                let user = new User({
                    username: args.username,
                    password: args.password,
                    name: args.name
                })
                user.password = user.generateHash(args.password);
                // save to the mongo db and return the object that was inserted
                return user.save()
            }
        },
        addTrip: {
            type: TripType,
            args: {
                userId: { type: GraphQLString },
                location: { type: GraphQLString },
                length: { type: GraphQLString },
                climate: { type: GraphQLString },
                traveler: { type: GraphQLString },
                luggage: { type: GraphQLString },
                apparel: { type: GraphQLString }


            },
            resolve: async function (parent, args) {
                let trip = new Trip({
                    user: args.userId,
                    location: args.location,
                    length: args.length,
                    climate: args.climate,
                    traveler: args.traveler,
                    luggage: args.luggage,
                    apparel: args.apparel
                });
                const newTrip = await trip.save()

                let savedUser = ""
                if (newTrip) {
                    savedUser = await User.findByIdAndUpdate({ _id: args.userId }, { $push: { trips: newTrip._id } })
                }

                if (savedUser) {
                    return newTrip
                }

            }
        },
        addItinerary: {
            type: ItineraryType,
            args: {
                tripId: { type: GraphQLString },
                title: { type: GraphQLString },
                date: { type: GraphQLString },
                notes: { type: GraphQLString }
            },
            resolve(parents, args) {
                let itinerary = new Itinerary({
                    trip: args.tripId,
                    title: args.title,
                    date: args.date,
                    notes: args.notes
                })
                return itinerary.save()
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});