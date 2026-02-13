# Deployment Checklist - Frontend Backend Integration

## ✅ Pre-Deployment Validation

### Files Created
- [x] `/src/lib/apiConfig.ts` - Global API configuration
- [x] `/src/services/apiService.js` - Reusable fetch wrapper
- [x] `/.env.local` - Environment variables
- [x] `/INTEGRATION.md` - Integration documentation
- [x] `/test-integration.js` - Backend connectivity test

### Files Modified
- [x] `/src/services/nyayaApi.js` - Updated to use deployed backend URL
- [x] `/src/components/LegalQueryCard.jsx` - Integrated with real API

### Code Changes Verified
- [x] No `localhost:8000` references remain
- [x] No `127.0.0.1` references remain
- [x] All API calls use `BASE_URL` from config
- [x] Loading states implemented
- [x] Error handling implemented
- [x] Null-safe rendering implemented

---

## 🚀 Deployment Steps

### Step 1: Verify Backend is Running
```bash
curl https://nyaya-ai-0f02.onrender.com/health
```
Expected: `{"status": "healthy", "service": "nyaya-api-gateway"}`

### Step 2: Test Backend Endpoints
```bash
# Test legal query endpoint
curl -X POST https://nyaya-ai-0f02.onrender.com/nyaya/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are contract laws in India?",
    "jurisdiction_hint": "India",
    "user_context": {"role": "citizen", "confidence_required": true}
  }'
```

### Step 3: Deploy to Vercel
```bash
cd frontend
vercel --prod
```

### Step 4: Set Environment Variables in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `NEXT_PUBLIC_API_URL` = `https://nyaya-ai-0f02.onrender.com`
5. Redeploy

### Step 5: Test Production Deployment
1. Open deployed Vercel URL
2. Navigate to "Ask Legal Question"
3. Submit a test query
4. Verify response from backend
5. Check browser console for errors
6. Verify Network tab shows correct backend URL

---

## 🔍 Validation Tests

### Test 1: Health Check
- [ ] Backend health endpoint responds
- [ ] Status is "healthy"
- [ ] No CORS errors in console

### Test 2: Legal Query
- [ ] Query form submits successfully
- [ ] Loading state displays
- [ ] Response renders in UI
- [ ] Trace ID is generated
- [ ] No network errors

### Test 3: Error Handling
- [ ] Invalid query shows error message
- [ ] Network failure shows user-friendly error
- [ ] Backend errors are caught and displayed

### Test 4: Performance
- [ ] First request completes (may take 30-60s on Render free tier)
- [ ] Subsequent requests are faster
- [ ] UI remains responsive during loading

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch"
**Cause:** Backend is sleeping (Render free tier)  
**Solution:** Wait 30-60 seconds for backend to wake up

### Issue: CORS Error
**Cause:** Backend not allowing frontend origin  
**Solution:** Update backend CORS settings to allow Vercel domain

### Issue: 404 Not Found
**Cause:** Incorrect endpoint path  
**Solution:** Verify endpoint matches backend routes exactly

### Issue: Environment variable not working
**Cause:** Vercel not picking up .env.local  
**Solution:** Set environment variables in Vercel dashboard

---

## 📊 Monitoring

### Vercel Analytics
- Monitor page load times
- Track API response times
- Check error rates

### Render Dashboard
- Monitor backend logs
- Check request counts
- Verify uptime

### Browser DevTools
- Network tab: Verify correct URLs
- Console: Check for errors
- Application tab: Verify environment variables

---

## 🎯 Success Criteria

- [x] All localhost references removed
- [x] API configuration centralized
- [x] Environment variables configured
- [x] Loading states implemented
- [x] Error handling implemented
- [x] Documentation complete
- [ ] Backend responds to health check
- [ ] Legal query returns valid response
- [ ] No CORS errors
- [ ] Production deployment successful
- [ ] All features working in production

---

## 📝 Post-Deployment Tasks

1. **Monitor First 24 Hours**
   - Check error logs
   - Monitor response times
   - Verify user feedback

2. **Performance Optimization**
   - Add request caching if needed
   - Implement retry logic for failed requests
   - Add request timeout handling

3. **User Experience**
   - Add better loading indicators
   - Improve error messages
   - Add success notifications

4. **Documentation**
   - Update README with production URLs
   - Document any issues encountered
   - Create troubleshooting guide

---

## 🔗 Important URLs

- **Backend:** https://nyaya-ai-0f02.onrender.com
- **Backend Health:** https://nyaya-ai-0f02.onrender.com/health
- **Frontend (Vercel):** [Add after deployment]
- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📞 Support

If issues persist:
1. Check backend logs on Render
2. Check frontend logs on Vercel
3. Test endpoints directly with Postman
4. Review browser console errors
5. Verify environment variables are set correctly

---

**Status:** ✅ Ready for Deployment  
**Last Updated:** 2024  
**Integration Version:** 1.0.0
